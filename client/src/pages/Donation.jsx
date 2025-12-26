import React, { useState, useRef } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import jsPDF from "jspdf"; // PDF

// simple helper to load Logo.jpg from /public as a data URL for jsPDF
const LOGO_PATH = "/Logo.jpg";

function loadLogoDataUrl() {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL("image/png");
      resolve(dataUrl);
    };
    img.onerror = reject;
    img.src = LOGO_PATH;
  });
}

export default function Donation() {
  // store all values that can change on this page
  const [amount, setAmount] = useState("10.00"); // donation amount
  const [message, setMessage] = useState(""); // success or error message
  const [isPaying, setIsPaying] = useState(false); // show loading while paying
  const [txId, setTxId] = useState(""); // PayPal transaction ID
  const [anonymous, setAnonymous] = useState(false); // hide user name if checked
  const [donorName, setDonorName] = useState(""); // store donor name for PDF

  // control success popup modal
  const [showModal, setShowModal] = useState(false);

  // hover glow around PayPal button
  const [hoverPayPal, setHoverPayPal] = useState(false);

  // ref for amount input (for "Other" button)
  const amountInputRef = useRef(null);

  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

  const container = { maxWidth: 600, margin: "50px auto", textAlign: "center" };
  const inputStyle = {
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    width: 200,
    textAlign: "center",
  };
  const successStyle = { marginTop: 14, fontWeight: "bold", color: "#16a34a" };
  const errorStyle = { marginTop: 14, fontWeight: "bold", color: "#b91c1c" };

  const validAmount = () => {
    const n = Number(amount);
    return Number.isFinite(n) && n >= 1;
  };

  const setPreset = (v) => {
    setAmount(v.toFixed(2));
    setMessage("");
    setTxId("");
  };

  const copyTx = async () => {
    try {
      await navigator.clipboard.writeText(txId);
      setMessage((m) =>
        m ? m + " (Transaction ID copied!)" : "Transaction ID copied!"
      );
    } catch {
      // ignore copy errors silently
    }
  };

  // ================= PDF Generator – invoice-style with logo =================
  function generateReceiptPDF({
    donor,
    amount,
    currency,
    txId,
    dateISO,
    logoDataUrl,
  }) {
    const pdf = new jsPDF();
    const marginX = 20;

    const amountFixed = Number(amount).toFixed(2);
    const dateStr = new Date(dateISO).toLocaleString();

    // simple reference number
    const baseForRef = txId || dateISO || "";
    const refSuffix = baseForRef.slice(-6).toUpperCase();
    const refNumber = `PIXI-${refSuffix || "000000"}`;

    // OUTER WHITE AREA
    pdf.setFillColor(255, 255, 255);
    pdf.rect(10, 10, 190, 277, "F");

    // LOGO (left)
    if (logoDataUrl) {
      // Logo Y: 18 (Starts at y=18, Height=30, ends at y=48)
      pdf.addImage(logoDataUrl, "PNG", marginX, 18, 40, 30);
    }

    // APP NAME + HEADER (left)
    pdf.setTextColor(0, 102, 204); // Blue for the main header
    pdf.setFontSize(18);
    pdf.setFont(undefined, "bold");
    pdf.text(
      "PixiPlay – Kids Game Exploration System",
      marginX + 50,
      35 // visually centered with logo
    );

    // Secondary Header Text (if you want later)
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.setFont(undefined, "normal");

    // RIGHT BLOCK – below header
    pdf.setFontSize(10);
    const infoRightX = 190; // right edge
    let infoY = 52; // start lower than header

    pdf.setFont(undefined, "bold");
    pdf.text("Donation Receipt", infoRightX, infoY, { align: "right" });
    pdf.setFont(undefined, "normal");
    infoY += 6;
    pdf.text(`Receipt No: ${refNumber}`, infoRightX, infoY, { align: "right" });
    infoY += 6;
    pdf.text(`Date: ${dateStr}`, infoRightX, infoY, { align: "right" });
    infoY += 6;
    pdf.text(`Transaction ID: ${txId || "N/A"}`, infoRightX, infoY, {
      align: "right",
    });

    // DONOR DETAILS – start even lower, so clearly separated
    let y = 80;
    pdf.setFontSize(11);
    pdf.setFont(undefined, "bold");
    pdf.text("Donor Details", marginX, y);
    pdf.setFont(undefined, "normal");
    y += 6;
    pdf.setFontSize(10);
    pdf.text(`Name: ${donor || "Anonymous"}`, marginX, y);
    y += 5;
    pdf.text("Email: (captured via PayPal sandbox)", marginX, y);

    // ORANGE SECTION HEADER
    y += 12;
    pdf.setFillColor(255, 183, 77); // orange bar
    pdf.rect(marginX, y, 170, 8, "F");
    pdf.setFontSize(10);
    pdf.setTextColor(255, 255, 255);
    pdf.setFont(undefined, "bold");
    pdf.text("DONATION SUMMARY", marginX + 2, y + 5);

    // reset text colour
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(undefined, "normal");

    // TABLE HEADER
    y += 14;
    pdf.setFontSize(10);
    pdf.setFillColor(245, 245, 245);
    pdf.rect(marginX, y, 170, 8, "F");
    pdf.setFont(undefined, "bold");
    pdf.text("Description", marginX + 2, y + 5);
    pdf.text("Qty", marginX + 115, y + 5);
    pdf.text("Amount", marginX + 145, y + 5);

    // TABLE ROW
    y += 12;
    pdf.setFont(undefined, "normal");
    pdf.text("Donation to support PixiPlay kids learning", marginX + 2, y);
    pdf.text("1", marginX + 117, y);
    pdf.text(`${currency} ${amountFixed}`, marginX + 145, y);

    // line under row
    pdf.setDrawColor(220, 220, 220);
    pdf.line(marginX, y + 4, marginX + 170, y + 4);

    // TOTALS
    y += 14;
    pdf.setFontSize(10);
    pdf.setFont(undefined, "bold");
    pdf.text("Total Donation:", marginX + 120, y);
    pdf.text(`${currency} ${amountFixed}`, marginX + 170, y, {
      align: "right",
    });

    // THANK YOU TEXT
    y += 14;
    pdf.setFontSize(10);
    pdf.setFont(undefined, "normal");
    pdf.text(
      "Thank you for supporting children’s education through PixiPlay.",
      marginX,
      y
    );
    y += 5;
    pdf.text(
      "Your contribution helps us keep interactive learning games free and engaging.",
      marginX,
      y
    );

    // SIGNATURE LINE – label is JUST company name
    y += 20;
    pdf.setDrawColor(180, 180, 180);
    pdf.line(marginX, y, marginX + 60, y);
    pdf.setFontSize(9);
    pdf.text("PixiPlay Foundation", marginX, y + 5);

    // FOOTER NOTE
    pdf.setFontSize(8);
    pdf.setTextColor(120, 120, 120);
    pdf.text(
      "This receipt is auto-generated by the PixiPlay Donation System (Sandbox).",
      marginX,
      270
    );
    pdf.text(
      "Note: Sandbox mode – no real money was transferred.",
      marginX,
      275
    );

    const file = `Donation_Receipt_${txId || "N_A"}.pdf`;
    pdf.save(file);
  }
  // ========================================================================

  // async: load logo, then create PDF
  const handleDownloadReceipt = async () => {
    if (!txId) return;

    const visibleDonor = anonymous ? "Anonymous" : donorName || "Donor";

    let logoDataUrl = null;
    try {
      logoDataUrl = await loadLogoDataUrl();
    } catch {
      logoDataUrl = null; // still create PDF without logo
    }

    generateReceiptPDF({
      donor: visibleDonor,
      amount,
      currency: "CAD",
      txId,
      dateISO: new Date().toISOString(),
      logoDataUrl,
    });
  };

  return (
    <div style={container}>
      <h1>Donation for Kids</h1>
      <p>Your donation helps make learning fun and accessible for children.</p>

      {/* Preset amounts + Other */}
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: 6,
        }}
      >
        {[5, 10, 20, 50].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setPreset(v)}
            style={{
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px solid #ddd",
              background: Number(amount) === v ? "#111" : "#f8f8f8",
              color: Number(amount) === v ? "#fff" : "#111",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            ${v}
          </button>
        ))}

        {/* Other / Custom amount button */}
        <button
          type="button"
          onClick={() => {
            setAmount("");
            setMessage("");
            setTxId("");
            if (amountInputRef.current) {
              amountInputRef.current.focus();
            }
          }}
          style={{
            padding: "6px 12px",
            borderRadius: 999,
            border: "1px solid #ddd",
            background: amount === "" ? "#111" : "#f8f8f8",
            color: amount === "" ? "#fff" : "#111",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          Other
        </button>
      </div>

      {/* Amount input */}
      <div>
        <input
          ref={amountInputRef}
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setTxId("");
            setMessage("");
          }}
          min="1"
          step="0.01"
          style={inputStyle}
          aria-label="Donation amount in CAD"
        />
      </div>

      {/* Anonymous toggle */}
      <label
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginTop: 8,
          fontSize: 14,
          color: "#444",
        }}
      >
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
        />
        Donate anonymously
      </label>

      {!validAmount() && (
        <div style={{ ...errorStyle }}>Minimum donation is $1.00</div>
      )}

      {/* PayPal Section with hover glow */}
      <div style={{ marginTop: 16 }}>
        <PayPalScriptProvider
          options={{
            "client-id": clientId,
            currency: "CAD",
            components: "buttons",
            "enable-funding": "paypal,card",
            "disable-funding": "paylater,venmo",
          }}
        >
          <div
            onMouseEnter={() => setHoverPayPal(true)}
            onMouseLeave={() => setHoverPayPal(false)}
            style={{
              display: "inline-block",
              borderRadius: 12,
              padding: 4,
              transition: "box-shadow 0.2s ease",
              boxShadow: hoverPayPal
                ? "0 0 18px rgba(15,118,110,0.45)"
                : "0 0 0 rgba(0,0,0,0)",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              disabled={!validAmount() || isPaying}
              createOrder={(_, actions) => {
                setMessage("");
                setTxId("");
                setShowModal(false);
                return actions.order.create({
                  purchase_units: [
                    {
                      description: "Donation for Kids",
                      amount: { value: Number(amount).toFixed(2) },
                    },
                  ],
                });
              }}
              onApprove={async (_, actions) => {
                try {
                  setIsPaying(true);
                  const details = await actions.order.capture();
                  const given = details?.payer?.name?.given_name || "Donor";
                  const id =
                    details?.id ||
                    details?.purchase_units?.[0]?.payments?.captures?.[0]?.id ||
                    "";

                  setTxId(id);
                  setDonorName(given);

                  const nameToShow = anonymous ? "Anonymous" : given;
                  setMessage(
                    `Thank you ${nameToShow}! You donated $${Number(
                      amount
                    ).toFixed(2)} CAD.`
                  );

                  // open success popup
                  setShowModal(true);
                } catch {
                  setMessage("Something went wrong capturing the payment.");
                } finally {
                  setIsPaying(false);
                }
              }}
              onError={() => {
                setIsPaying(false);
                setMessage("Payment failed. Please try again.");
              }}
            />
          </div>
        </PayPalScriptProvider>
      </div>

      {isPaying && (
        <div style={{ marginTop: 8, fontSize: 13, color: "#555" }}>
          Processing your donation…
        </div>
      )}

      {/* Success or Error + PDF button (fallback UI) */}
      {message && (
        <div
          style={{
            marginTop: 12,
            display: "inline-flex",
            flexDirection: "column",
            gap: 8,
            alignItems: "center",
          }}
        >
          <p style={message.startsWith("Thank") ? successStyle : errorStyle}>
            {message}
          </p>

          {txId && (
            <>
              <div style={{ fontSize: 13, color: "#374151" }}>
                Transaction ID:{" "}
                <code
                  style={{
                    background: "#f3f4f6",
                    padding: "2px 6px",
                    borderRadius: 6,
                  }}
                >
                  {txId}
                </code>{" "}
                <button
                  type="button"
                  onClick={copyTx}
                  style={{
                    border: "1px solid #ddd",
                    background: "#fff",
                    padding: "3px 8px",
                    borderRadius: 6,
                    cursor: "pointer",
                    marginLeft: 6,
                    fontSize: 12,
                  }}
                >
                  Copy
                </button>
              </div>

              {/* Download Receipt */}
              <button
                type="button"
                onClick={handleDownloadReceipt}
                style={{
                  marginTop: 6,
                  border: "none",
                  background: "#0f766e",
                  color: "#fff",
                  padding: "6px 14px",
                  borderRadius: 999,
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                Download Receipt (PDF)
              </button>
            </>
          )}
        </div>
      )}

      {/* SUCCESS POPUP MODAL */}
      {showModal && txId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "20px 24px",
              maxWidth: 380,
              width: "90%",
              boxShadow: "0 20px 45px rgba(0,0,0,0.25)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}></div>
            <h2 style={{ margin: "0 0 8px" }}>Thank you for your donation!</h2>
            <p style={{ margin: 0, fontSize: 14, color: "#4b5563" }}>
              Your support helps kids learn better through fun and interactive
              games.
            </p>
            <p
              style={{
                marginTop: 10,
                fontSize: 12,
                color: "#6b7280",
                wordBreak: "break-all",
              }}
            >
              <strong>Transaction ID:</strong> {txId}
            </p>

            <div
              style={{
                marginTop: 14,
                display: "flex",
                gap: 8,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={handleDownloadReceipt}
                style={{
                  border: "none",
                  background: "#0f766e",
                  color: "#fff",
                  padding: "6px 14px",
                  borderRadius: 999,
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                Download Receipt (PDF)
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  border: "1px solid #d1d5db",
                  background: "#fff",
                  color: "#111827",
                  padding: "6px 14px",
                  borderRadius: 999,
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}