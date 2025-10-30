import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";

const DEFAULT_UPI = import.meta.env.VITE_UPI_ID || "9445246224@yapl";

export default function Donate({ onDonate }) {
  const [form, setForm] = useState({ name: "", phone: "", amount: "" });
  const [showQR, setShowQR] = useState(false);
  const svgRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const UPI_ID = '9445246224@yapl';

  const upiLink = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    form.name || "ShareEase"
  )}&am=${encodeURIComponent(form.amount || "")}&cu=INR&tn=${encodeURIComponent("ShareEase Donation")}`;

  useEffect(() => {
    setShowQR(Boolean(form.amount && Number(form.amount) > 0));
  }, [form.amount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "amount") {
      if (value === "" || /^[0-9\b.]+$/.test(value)) setForm(f => ({ ...f, amount: value }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSave = (e) => {
    e?.preventDefault();
    if (!form.amount || Number(form.amount) <= 0) {
      alert("Enter a valid amount to save donation.");
      return;
    }
    if (onDonate) onDonate({ ...form });
    setForm({ name: form.name, phone: form.phone, amount: "" });
    setShowQR(false);
    
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(upiLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Copy failed.");
    }
  };

  const handleDownload = async () => {
    const svgEl = svgRef.current?.querySelector("svg");
    if (!svgEl) { alert("QR not ready"); return; }
    setDownloading(true);
    try {
      const serializer = new XMLSerializer();
      let svgString = serializer.serializeToString(svgEl);
      if (!svgString.match(/^<svg[^>]+xmlns="http:\/\/www.w3.org\/2000\/svg"/)) {
        svgString = svgString.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
      }
      const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const size = 600;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0,0,size,size);
        ctx.drawImage(img, 0, 0, size, size);
        const png = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = png;
        a.download = `shareease-qr-${form.amount || "0"}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        setDownloading(false);
      };
      img.onerror = () => { URL.revokeObjectURL(url); setDownloading(false); alert("Failed to render QR."); };
      img.src = url;
    } catch {
      setDownloading(false);
      alert("Download failed.");
    }
  };

  return (
    <div style={{ marginTop:20 }}>
      <div className="grid-2">
        <div className="card">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <h2 style={{ margin:0 }}>Donate</h2>
              <div className="small" style={{ marginTop:6 }}>Type an amount</div>
            </div>
            <div className="small">Secure • Quick</div>
          </div>

          <form onSubmit={handleSave} style={{ marginTop:16 }}>
            <div style={{ marginBottom:10 }}>
              <input className="input" name="name" placeholder="Your name (optional)" value={form.name} onChange={handleChange} />
            </div>

            <div style={{ marginBottom:10 }}>
              <input className="input" name="phone" placeholder="Phone (optional)" value={form.phone} onChange={handleChange} />
            </div>

            <div style={{ marginBottom:12, display:"flex", gap:10 }}>
              <input className="input" name="amount" placeholder="Amount (₹)" value={form.amount} onChange={handleChange} />
              <div style={{ display:"flex", alignItems:"center", padding:"0 12px", borderRadius:12, border:"1px solid #eef6ea", background:"#fbfff9", color:"#334155" }}>INR</div>
            </div>

            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <button className="btn btn-primary" type="submit">Save Donation</button>
              <button className="btn btn-ghost" type="button" onClick={() => { setForm({ name:"", phone:"", amount:"" }); setShowQR(false); }}>Reset</button>
              
            </div>
          </form>
        </div>

        <div className="card" style={{ display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column" }}>
          <div style={{ textAlign:"center" }}>
            <h3 style={{ margin:0 }}>QR Preview</h3>
            
          </div>

          <div style={{ marginTop:16, display:"flex", gap:16, alignItems:"center" }}>
            <div className="qr-wrap" ref={svgRef} aria-hidden={!showQR}>
              {showQR ? (
                <div style={{ padding:8 }}>
                  <QRCode value={upiLink} size={180} />
                </div>
              ) : (
                <div style={{ color:"#94a3b8", fontSize:13 }}>QR will appear here</div>
              )}
            </div>

            <div style={{ maxWidth:300 }}>
              <div className="small">Amount</div>
              <div style={{ fontSize:20, fontWeight:700, marginTop:6 }}>₹ {form.amount && Number(form.amount) > 0 ? Number(form.amount).toLocaleString() : "0"}</div>

              <div style={{ marginTop:12 }} className="small">
                {showQR ? (
                  <>
                    <div style={{ fontWeight:700, marginBottom:6 }}>UPI Link</div>
                    <div style={{ fontSize:12, color:"#475569", wordBreak:"break-all" }}>{upiLink}</div>
                  </>
                ) : (
                  "Type an amount to generate the QR code instantly."
                )}
              </div>

              <div style={{ marginTop:12, display:"flex", gap:8 }}>
                <button className="btn" onClick={handleCopy} disabled={!showQR} style={{ padding:"8px 10px", borderRadius:10, background: showQR ? "#ecfdf5" : "#f7faf8", color: showQR ? "#166534" : "#94a3b8", fontWeight:700 }}>
                  {copied ? "Copied!" : "Copy UPI Link"}
                </button>

                <button className="btn btn-ghost" onClick={handleDownload} disabled={!showQR || downloading}>
                  {downloading ? "Preparing..." : "Download QR"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
