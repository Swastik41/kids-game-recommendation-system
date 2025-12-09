import React, { useState, useRef, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import jsPDF from "jspdf";

// simple helper to load Logo.jpg from /public as a data URL for jsPDF
const LOGO_PATH = "/Logo.jpg";

// load logo for PDF
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
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = LOGO_PATH;
  });
}

export default function Donation() {
  // EXISTING STATES (unchanged)
  const [amount, setAmount] = useState("10.00");
  const [message, setMessage] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [txId, setTxId] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [hoverPayPal, setHoverPayPal] = useState(false);

  const amountInputRef = useRef(null);
  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

  // ---------------------------
  // ⭐ NEW FEATURES STATE
  // ---------------------------

  // Donation goal (example: $1000 goal)
  const DONATION_GOAL = 10000;
  const [totalDonations, setTotalDonations] = useState(250); // start example
  const progressPercent = Math.min(
    Math.round((totalDonations / DONATION_GOAL) * 100),
    100
  );

  // Top donor list (local only)
  const [donors, setDonors] = useState([]);

  // Confetti animation trigger
  const [showConfetti, setShowConfetti] = useState(false);

  // ---------------------------
  // Confetti Renderer
  // ---------------------------

  useEffect(() => {
    if (!showConfetti) return;

    const duration = 2200;
    const end = Date.now() + duration;

    function frame() {
      const colors = ["#facc15", "#0ea5e9", "#f97316", "#22c55e"];

      const particle = document.createElement("div");
      particle.style.position = "fixed";
      particle.style.top = "-10px";
      particle.style.left = Math.random() * window.innerWidth + "px";
      particle.style.width = "8px";
      particle.style.height = "14px";
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.opacity = 0.9;
      particle.style.transform = `rotate(${Math.random() * 360}deg)`;
      particle.style.borderRadius = "2px";
      particle.style.zIndex = "99999";
      particle.style.transition = "transform 2s linear, top 2.2s ease-out";

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.style.top = window.innerHeight + "px";
        particle.style.transform += " translateY(40px)";
      }, 10);

      setTimeout(() => particle.remove(), 2300);

      if (Date.now() < end) requestAnimationFrame(frame);
    }
    frame();

    setTimeout(() => setShowConfetti(false), 2500);
  }, [showConfetti]);

  // ---------------------------
  // Helpers (unchanged)
  // ---------------------------

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
      setMessage((m) => m + " (Copied!)");
    } catch {}
  };

  // ---------------------------
  // PDF Generator (unchanged)
  // ---------------------------

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

  const handleDownloadReceipt = async () => {
    if (!txId) return;

    const visibleDonor = anonymous ? "Anonymous" : donorName || "Donor";
    let logoDataUrl = null;

    try {
      logoDataUrl = await loadLogoDataUrl();
    } catch {}

    generateReceiptPDF({
      donor: visibleDonor,
      amount,
      currency: "CAD",
      txId,
      dateISO: new Date().toISOString(),
      logoDataUrl,
    });
  };

  // ------------------------------------
  // PAGE UI
  // ------------------------------------

  const container = {
    maxWidth: 650,
    margin: "50px auto",
    textAlign: "center",
    paddingBottom: 60,
  };

  return (
    <div style={container}>
      <h1>Donation for Kids</h1>
      <p>Your donation helps make learning fun and accessible for children.</p>

      {/* ------------------------------------------
          ⭐ Mission Statement
      -------------------------------------------- */}
      <div
        style={{
          marginTop: 16,
          background: "#f0f9ff",
          padding: "18px 20px",
          borderRadius: 14,
          border: "1px solid #bae6fd",
          textAlign: "left",
        }}
      >
        <h2 style={{ margin: 0, color: "#0369a1" }}>🌍 Our Mission</h2>
        <p style={{ marginTop: 6, fontSize: 14, color: "#0f172a" }}>
          PixiPlay empowers children through safe, playful, and educational
          digital experiences. Every contribution helps us expand access to free
          learning tools, enrich our game recommendations, and improve interactive
          learning across communities.
        </p>
      </div>

      {/* ------------------------------------------
          ⭐ Donation Goal Progress Bar
      -------------------------------------------- */}
      <div style={{ marginTop: 20, textAlign: "left" }}>
        <h3 style={{ margin: "0 0 6px" }}>🎯 Donation Goal: ${DONATION_GOAL}</h3>
        <div
          style={{
            width: "100%",
            height: 16,
            background: "#e5e7eb",
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: progressPercent + "%",
              height: "100%",
              background: "#0f766e",
              transition: "width .4s ease",
            }}
          ></div>
        </div>
        <p style={{ marginTop: 4, fontSize: 14, color: "#374151" }}>
          Raised: <b>${totalDonations.toFixed(2)}</b> ({progressPercent}%)
        </p>
      </div>

      {/* Preset Buttons */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 10 }}>
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

        <button
          type="button"
          onClick={() => {
            setAmount("");
            setTxId("");
            amountInputRef.current?.focus();
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

      {/* Amount Input */}
      <label htmlFor="donation-amount" style={{ display: "block", marginTop: 16, fontSize: 14, color: "#444" }}>
        Enter Donation Amount (CAD):
      </label>
      <input
        id="donation-amount"
        ref={amountInputRef}
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="1"
        step="0.01"
        style={{
          padding: 10,
          marginTop: 10,
          borderRadius: 8,
          border: "1px solid #ccc",
          width: 200,
          textAlign: "center",
        }}
      />

      {/* Anonymous toggle */}
      <label
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginTop: 10,
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

      {/* ------------------ PayPal ------------------ */}
      <div style={{ marginTop: 16 }}>
        <PayPalScriptProvider
          options={{
            "client-id": clientId,
            currency: "CAD",
            components: "buttons",
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
              boxShadow: hoverPayPal ? "0 0 18px rgba(15,118,110,0.45)" : "none",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              disabled={!validAmount()}
              createOrder={(_, actions) => {
                setShowModal(false);
                setMessage("");
                setTxId("");
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

                  const visible = anonymous ? "Anonymous" : given;

                  // 1️⃣ Update donation total
                  setTotalDonations((prev) => prev + Number(amount));

                  // 2️⃣ Append to Top Donors list
                  setDonors((prev) => [
                    { name: visible, amount: Number(amount) },
                    ...prev,
                  ]);

                  // 3️⃣ Trigger Confetti
                  setShowConfetti(true);

                  // 4️⃣ Show message
                  setMessage(
                    `Thank you ${visible}! You donated $${Number(amount).toFixed(
                      2
                    )} CAD.`
                  );

                  setShowModal(true);
                } catch {
                  setMessage("Payment failed.");
                } finally {
                  setIsPaying(false);
                }
              }}
            />
          </div>
        </PayPalScriptProvider>
      </div>

      {/* ------------------ Top Donors List ------------------ */}
      {donors.length > 0 && (
        <div
          style={{
            marginTop: 30,
            textAlign: "left",
            background: "#fff7ed",
            padding: "18px 20px",
            borderRadius: 14,
            border: "1px solid #fed7aa",
          }}
        >
          <h3 style={{ marginTop: 0, color: "#c2410c" }}>🏆 Top Donors</h3>
          {donors.slice(0, 5).map((d, i) => (
            <div key={i} style={{ fontSize: 14, color: "#7c2d12" }}>
              {i + 1}. {d.name} — <b>${d.amount.toFixed(2)}</b>
            </div>
          ))}
        </div>
      )}

      {/* ------------------ Success Modal ------------------ */}
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
            <h2>🎉 Thank you for your donation!</h2>
            <p style={{ fontSize: 14 }}>
              Your contribution helps kids learn through play.
            </p>

            <p>
              <strong>Transaction ID:</strong> {txId}
            </p>

            <div style={{ marginTop: 14 }}>
              <button
                onClick={handleDownloadReceipt}
                style={{
                  marginRight: 8,
                  border: "none",
                  background: "#0f766e",
                  color: "#fff",
                  padding: "6px 14px",
                  borderRadius: 999,
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                Download Receipt
              </button>

              <button
                onClick={() => setShowModal(false)}
                style={{
                  border: "1px solid #ccc",
                  background: "#fff",
                  padding: "6px 14px",
                  borderRadius: 999,
                  cursor: "pointer",
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
