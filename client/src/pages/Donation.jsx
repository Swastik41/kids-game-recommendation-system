import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import jsPDF from "jspdf"; // PDF

export default function Donation() {
  // store all values that can change on this page
  const [amount, setAmount] = useState("10.00"); // donation amount
  const [message, setMessage] = useState(""); // success or error message
  const [isPaying, setIsPaying] = useState(false); // show loading while paying
  const [txId, setTxId] = useState(""); // PayPal transaction ID
  const [anonymous, setAnonymous] = useState(false); // hide user name if checked
  const [donorName, setDonorName] = useState(""); // store donor name for PDF

  // NEW: control success popup modal
  const [showModal, setShowModal] = useState(false);

  // NEW: hover glow around PayPal button
  const [hoverPayPal, setHoverPayPal] = useState(false);

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

  // PDF Generator (fancy version, now with ref + footer + ribbon)
  function generateReceiptPDF({ donor, amount, currency, txId, dateISO }) {
    const pdf = new jsPDF();

    // === HEADER BAR ===
    pdf.setFillColor(15, 118, 110); // teal
    pdf.rect(0, 0, 210, 30, "F"); // full width top bar (A4 width = 210mm)

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(18);
    pdf.text("Donation Receipt", 20, 18);

    pdf.setFontSize(11);
    pdf.text("PixiPlay – Kids Learning Platform", 20, 25);

    // reset text color for body
    pdf.setTextColor(0, 0, 0);

    // === CARD CONTAINER ===
    const boxX = 15;
    const boxY = 40;
    const boxW = 180;
    const boxH = 90;

    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    pdf.roundedRect(boxX, boxY, boxW, boxH, 3, 3); // rounded rectangle

    // === BODY CONTENT INSIDE CARD ===
    const dateStr = new Date(dateISO).toLocaleString();

    // simple reference number from txId or date
    const baseForRef = txId || dateISO || "";
    const refSuffix = baseForRef.slice(-6).toUpperCase();
    const refNumber = `PIXI-${refSuffix || "000000"}`;

    let y = boxY + 12;
    pdf.setFontSize(12);
    pdf.text(`Donor: ${donor || "Anonymous"}`, boxX + 8, y);
    y += 8;

    // Highlight amount
    pdf.setFontSize(13);
    pdf.setFont(undefined, "bold");
    pdf.text(
      `Amount: ${currency} ${Number(amount).toFixed(2)}`,
      boxX + 8,
      y
    );
    pdf.setFont(undefined, "normal");
    y += 8;

    pdf.setFontSize(12);
    pdf.text(`Transaction ID: ${txId || "N/A"}`, boxX + 8, y);
    y += 8;

    pdf.text(`Reference: ${refNumber}`, boxX + 8, y);
    y += 8;

    pdf.text(`Date: ${dateStr}`, boxX + 8, y);
    y += 12;

    // Thank-you lines
    pdf.setFontSize(11);
    pdf.text(
      "Thank you for supporting children’s learning through PixiPlay.",
      boxX + 8,
      y
    );
    y += 6;
    pdf.text(
      "Your contribution helps us keep educational games fun and accessible.",
      boxX + 8,
      y
    );

    // === THANK-YOU RIBBON (bottom bar) ===
    pdf.setFillColor(240, 249, 250);
    pdf.rect(0, 150, 210, 12, "F");
    pdf.setFontSize(10);
    pdf.setTextColor(15, 23, 42);
    pdf.text(
      "Thank you for making a difference in kids’ education!",
      20,
      158
    );

    // === FOOTER SIGNATURE / ISSUER TEXT ===
    pdf.setTextColor(100, 100, 100);
    pdf.setFontSize(9);
    pdf.text("Issued by: PixiPlay Donation System (Sandbox Demo)", 20, 175);
    pdf.text(
      "This receipt is auto-generated and valid for digital confirmation only.",
      20,
      181
    );
    pdf.text(
      "Note: Sandbox test – no real money was transferred.",
      20,
      187
    );

    const file = `Donation_Receipt_${txId || "N_A"}.pdf`;
    pdf.save(file);
  }

  const handleDownloadReceipt = () => {
    if (!txId) return;

    const visibleDonor = anonymous ? "Anonymous" : donorName || "Donor";

    generateReceiptPDF({
      donor: visibleDonor,
      amount,
      currency: "CAD",
      txId,
      dateISO: new Date().toISOString(),
    });
  };

  return (
    <div style={container}>
      <h1>Donation for Kids</h1>
      <p>Your donation helps make learning fun and accessible for children.</p>

      {/* Preset amounts */}
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
      </div>

      {/* Amount input */}
      <div>
        <input
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
