import React, { useState } from "react";
import axios from "axios";

function MailForm() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [emails, setEmails] = useState("");

  const handleSend = async () => {
    if (!subject || !body || !emails) {
      alert("All fields are required");
      return;
    }

    const recipients = emails.split(",").map((e) => e.trim());

    try {
      const res = await axios.post("http://localhost:5000/api/emails/send", {
        subject,
        body,
        recipients,
      });

      alert(res.data.message);
      setSubject("");
      setBody("");
      setEmails("");
    } catch (err) {
      alert("❌ Failed to send emails");
    }
  };

  return (
    <div>
      <h2>Send Bulk Mail</h2>

      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        style={{ width: "300px", marginBottom: "10px" }}
      />
      <br />

      <textarea
        placeholder="Email Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        style={{ width: "300px", height: "100px", marginBottom: "10px" }}
      />
      <br />

      <textarea
        placeholder="Emails (comma separated)"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
        style={{ width: "300px", height: "80px", marginBottom: "10px" }}
      />
      <br />

      <button onClick={handleSend}>Send Emails</button>
    </div>
  );
}

export default MailForm;