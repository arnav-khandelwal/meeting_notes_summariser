
import React, { useState } from 'react';
import './styles/meeting-notes.scss';

function App() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [editedSummary, setEditedSummary] = useState('');
  const [emailRecipients, setEmailRecipients] = useState('');
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  // API call to backend for summarization
  const handleSummarize = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }
    
    setLoading(true);
    const formData = new FormData();
    formData.append('meetingNotes', file);
    formData.append('customPrompt', customPrompt);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        setSummary(result.summary);
        setEditedSummary(result.summary);
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to connect to server. Make sure the backend is running on port 3001.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSummary('');
    setEditedSummary('');
  };

  const handleShare = (platform) => {
    if (platform === 'Email') {
      setShowEmailDialog(true);
    } else {
      alert(`Sharing to ${platform} - Feature coming soon!`);
    }
  };

  const handleSendEmail = async () => {
    if (!emailRecipients.trim()) {
      alert('Please enter at least one email address');
      return;
    }

    if (!editedSummary.trim()) {
      alert('No summary to send');
      return;
    }

    setEmailSending(true);
    const recipients = emailRecipients.split(',').map(email => email.trim());
    
    try {
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients: recipients,
          subject: 'Meeting Summary',
          summary: editedSummary,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        alert(`Summary sent successfully to ${recipients.length} recipient(s)!`);
        setShowEmailDialog(false);
        setEmailRecipients('');
      } else {
        alert('Error sending email: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send email. Make sure the backend is running.');
    } finally {
      setEmailSending(false);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>AI Meeting Notes Summarizer</h1>
        <p>Upload your meeting notes and get a customized AI-generated summary to share with your team.</p>
      </div>

      <div className="upload-section">
        <label className="upload-label" htmlFor="meeting-notes-upload">
          Upload Meeting Notes (.txt, .docx, .pdf)
        </label>
        <input 
          id="meeting-notes-upload" 
          type="file" 
          accept=".txt,.docx,.pdf" 
          onChange={handleFileChange} 
        />
        {file && <p className="file-selected">Selected: {file.name}</p>}
        
        <div className="prompt-section">
          <label className="prompt-label" htmlFor="custom-prompt">
            Custom Instructions (optional):
          </label>
          <textarea
            id="custom-prompt"
            className="prompt-input"
            placeholder="e.g., 'Summarize in bullet points for executives' or 'Highlight only action items'"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            rows={3}
          />
        </div>

        <button 
          className="summarize-btn" 
          onClick={handleSummarize} 
          disabled={!file || loading}
        >
          {loading ? 'Generating Summary...' : 'Generate Summary'}
        </button>
      </div>

      {summary && (
        <div className="summary-section">
          <div className="summary-title">Generated Summary (Editable)</div>
          <textarea
            className="summary-content editable"
            value={editedSummary}
            onChange={(e) => setEditedSummary(e.target.value)}
            rows={8}
          />
          <div className="share-section">
            <button className="share-btn" onClick={() => handleShare('Email')}>
              Share via Email
            </button>
            <button className="share-btn" onClick={() => handleShare('Slack')}>
              Share to Slack
            </button>
            <button className="share-btn" onClick={() => handleShare('Copy Link')}>
              Copy Link
            </button>
          </div>
        </div>
      )}

      {showEmailDialog && (
        <div className="email-dialog-overlay">
          <div className="email-dialog">
            <h3>Send Summary via Email</h3>
            <label htmlFor="email-recipients">
              Recipients (comma-separated):
            </label>
            <input
              id="email-recipients"
              type="text"
              className="email-input"
              placeholder="john@example.com, jane@example.com"
              value={emailRecipients}
              onChange={(e) => setEmailRecipients(e.target.value)}
            />
            <div className="email-dialog-buttons">
              <button 
                className="cancel-btn" 
                onClick={() => setShowEmailDialog(false)}
                disabled={emailSending}
              >
                Cancel
              </button>
              <button 
                className="send-btn" 
                onClick={handleSendEmail}
                disabled={emailSending}
              >
                {emailSending ? 'Sending...' : 'Send Email'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



export default App
