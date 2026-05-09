import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [emails, setEmails] = useState("");
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/emails/history");
      setHistory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const sendMail = async () => {
    try {
      const recipients = emails
        .split(",")
        .map((email) => email.trim());

      await axios.post("http://localhost:5000/api/emails/send", {
        subject,
        body,
        recipients,
      });

      alert("Emails Sent Successfully");

      setSubject("");
      setBody("");
      setEmails("");

      fetchHistory();
    } catch (err) {
      console.log(err);
      alert("Failed to send emails");
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
          Bulk Mail Application
        </h1>

        <div className="bg-white shadow-lg rounded-2xl p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Send Bulk Mail
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              placeholder="Email Body"
              rows="6"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              placeholder="Emails (comma separated)"
              rows="5"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={sendMail}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
            >
              Send Emails
            </button>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-700">
            Email History
          </h2>

          {history.length === 0 ? (
            <p className="text-gray-500">No email history found.</p>
          ) : (
            <div className="space-y-4">
              {history.map((mail, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-4 bg-gray-50"
                >
                  <p className="mb-2">
                    <span className="font-bold">Subject:</span> {mail.subject}
                  </p>

                  <p className="mb-2">
                    <span className="font-bold">Status:</span>
                    <span
                      className={`ml-2 font-semibold ${mail.status === "SUCCESS"
                        ? "text-green-600"
                        : "text-red-600"
                        }`}
                    >
                      {mail.status}
                    </span>
                  </p>

                  <p className="mb-2">
                    <span className="font-bold">Recipients:</span>{" "}
                    {mail.recipients.join(", ")}
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(mail.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;