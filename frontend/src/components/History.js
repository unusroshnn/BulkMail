import React, { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [mails, setMails] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/emails/history");
      setMails(res.data);
    } catch (err) {
      console.log("Error fetching history");
    }
  };

  return (
    <div>
      <h2>Email History</h2>

      {mails.length === 0 ? (
        <p>No history found</p>
      ) : (
        mails.map((mail, index) => (
          <div key={index} style={{ borderBottom: "1px solid gray", marginBottom: "10px" }}>
            <p><b>Subject:</b> {mail.subject}</p>
            <p><b>Status:</b> {mail.status}</p>
            <p><b>Recipients:</b> {mail.recipients.join(", ")}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default History;