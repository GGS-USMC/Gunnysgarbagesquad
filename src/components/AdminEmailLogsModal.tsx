import React, { useState, useEffect } from 'react';
import { X, Mail, CheckCircle2, AlertCircle, RefreshCw, Send, Eye, ShieldCheck, Inbox, FileText } from 'lucide-react';

interface SentEmailLog {
  id: string;
  timestamp: string;
  type: string;
  to: string;
  subject: string;
  leadId: string;
  communityName: string;
  status: string;
  mode: string;
  htmlPreview?: string;
}

interface QuoteLead {
  id: string;
  timestamp: string;
  name: string;
  hoaName: string;
  email: string;
  phone: string;
  city: string;
  approxHomes: string;
  frequency?: string;
  message: string;
  estimatedWeeklyRate?: string;
  estimatedMonthlyRate?: string;
  status: string;
  emailNotificationSent?: boolean;
}

interface AdminEmailLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminEmailLogsModal: React.FC<AdminEmailLogsModalProps> = ({ isOpen, onClose }) => {
  const [adminEmail, setAdminEmail] = useState<string>('gunnysgarbagesquad@gmail.com');
  const [smtpConfigured, setSmtpConfigured] = useState<boolean>(false);
  const [quoteLeads, setQuoteLeads] = useState<QuoteLead[]>([]);
  const [emailLogs, setEmailLogs] = useState<SentEmailLog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'quotes' | 'emails'>('quotes');
  const [testSending, setTestSending] = useState<boolean>(false);
  const [testFeedback, setTestFeedback] = useState<string>('');
  const [selectedPreviewHtml, setSelectedPreviewHtml] = useState<string | null>(null);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/leads');
      const data = await res.json();
      if (data.adminEmail) setAdminEmail(data.adminEmail);
      if (data.smtpConfigured !== undefined) setSmtpConfigured(data.smtpConfigured);
      if (data.quoteLeads) setQuoteLeads(data.quoteLeads);
      if (data.sentEmailLogs) setEmailLogs(data.sentEmailLogs);
    } catch (err) {
      console.error('Error loading admin logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAdminData();
    }
  }, [isOpen]);

  const handleSendTestEmail = async () => {
    setTestSending(true);
    setTestFeedback('');
    try {
      const res = await fetch('/api/admin/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail })
      });
      const data = await res.json();
      if (data.success) {
        setTestFeedback(`✅ Test quote notification email successfully dispatched to ${adminEmail}`);
        fetchAdminData();
      } else {
        setTestFeedback(`❌ ${data.error || 'Failed to send test email'}`);
      }
    } catch (err) {
      setTestFeedback('❌ Connection error sending test email.');
    } finally {
      setTestSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 flex flex-col relative">
        
        {/* Modal Header */}
        <div className="bg-forest text-white p-6 flex items-center justify-between border-b border-emerald-900 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 p-2 border border-emerald-700 flex items-center justify-center text-emerald-300 shadow">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black font-outfit text-white">Quote Signup & Email Notification Hub</h3>
                <span className="text-[10px] font-bold bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Admin Hub
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 pt-0.5">
                Notifications configured to dispatch to: <span className="text-white font-bold underline">{adminEmail}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchAdminData}
              disabled={loading}
              title="Refresh Data"
              className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-800/60 rounded-xl transition-all"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-800/60 rounded-xl transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* System Bar & Quick Test Action */}
        <div className="bg-emerald-900 text-white px-6 py-3 border-b border-emerald-800 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>
              Target Email: <strong className="text-emerald-200">{adminEmail}</strong>
            </span>
            <span className="text-emerald-400">|</span>
            <span className="bg-emerald-800/80 px-2 py-0.5 rounded text-[11px] border border-emerald-700">
              {smtpConfigured ? '🟢 SMTP Live Mode' : '⚡ Instant Email Dispatcher Active'}
            </span>
          </div>

          <button
            onClick={handleSendTestEmail}
            disabled={testSending}
            className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-forest font-extrabold text-xs rounded-lg shadow flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{testSending ? 'Sending...' : 'Send Test Email to Me'}</span>
          </button>
        </div>

        {testFeedback && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2 text-xs font-bold text-emerald-900 flex items-center justify-between">
            <span>{testFeedback}</span>
            <button onClick={() => setTestFeedback('')} className="text-emerald-700 hover:text-emerald-950 text-xs">Dismiss</button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-slate-100 px-6 pt-3 pb-0 border-b border-gray-200 flex gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-4 py-2.5 font-bold text-xs rounded-t-xl transition-all flex items-center gap-2 ${
              activeTab === 'quotes'
                ? 'bg-white text-forest border-t-2 border-forest shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-slate-200/60'
            }`}
          >
            <Inbox className="w-4 h-4 text-forest" />
            <span>Incoming Quote Sign-Ups ({quoteLeads.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('emails')}
            className={`px-4 py-2.5 font-bold text-xs rounded-t-xl transition-all flex items-center gap-2 ${
              activeTab === 'emails'
                ? 'bg-white text-forest border-t-2 border-forest shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-slate-200/60'
            }`}
          >
            <Mail className="w-4 h-4 text-forest" />
            <span>Dispatched Email Logs ({emailLogs.length})</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {activeTab === 'quotes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-600">
                  Every time a user fills out the quote form, a structured email alert is sent to <strong>{adminEmail}</strong>.
                </p>
                <span className="text-[11px] font-bold text-forest bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Total Quotes: {quoteLeads.length}
                </span>
              </div>

              {quoteLeads.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-gray-300 space-y-2">
                  <Inbox className="w-10 h-10 text-gray-400 mx-auto" />
                  <p className="text-sm font-bold text-gray-700">No quote requests yet</p>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Submit a test quote request on the website to see the lead and email notification appear here in real time.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {quoteLeads.map((quote) => (
                    <div 
                      key={quote.id}
                      className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:border-emerald-300 transition-all space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            {quote.id}
                          </span>
                          <h4 className="text-base font-extrabold text-gray-900 font-outfit">
                            {quote.hoaName} <span className="text-xs font-medium text-gray-500">({quote.city}, AZ)</span>
                          </h4>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                            Email Alert Sent to {adminEmail}
                          </span>
                          <span className="text-[11px] text-gray-400">
                            {new Date(quote.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <p className="text-gray-400 font-bold uppercase text-[10px]">Contact Person</p>
                          <p className="font-extrabold text-gray-800">{quote.name}</p>
                          <p className="text-emerald-700 font-semibold underline"><a href={`mailto:${quote.email}`}>{quote.email}</a></p>
                          <p className="text-gray-600">{quote.phone}</p>
                        </div>

                        <div>
                          <p className="text-gray-400 font-bold uppercase text-[10px]">Community & Plan</p>
                          <p className="font-extrabold text-gray-800">{quote.approxHomes} Homes</p>
                          <p className="text-forest font-bold text-[11px]">{quote.frequency || 'Once Weekly ($7.25/wk)'}</p>
                          <p className="text-emerald-800 font-bold">{quote.estimatedWeeklyRate || quote.estimatedMonthlyRate || '$7.25 / home / week'}</p>
                        </div>

                        <div>
                          <p className="text-gray-400 font-bold uppercase text-[10px]">Notes / Message</p>
                          <p className="text-gray-700 italic text-[11px] line-clamp-2">{quote.message || 'No additional details.'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'emails' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-600">
                  Audit log of generated and dispatched HTML email alerts sent to <strong>{adminEmail}</strong>.
                </p>
                <span className="text-[11px] font-bold text-forest bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {emailLogs.length} Dispatched Logs
                </span>
              </div>

              {emailLogs.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-gray-300 space-y-2">
                  <Mail className="w-10 h-10 text-gray-400 mx-auto" />
                  <p className="text-sm font-bold text-gray-700">No email logs recorded yet</p>
                  <p className="text-xs text-gray-500">
                    Click "Send Test Email to Me" above or submit a quote request on the site to generate log entries.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {emailLogs.map((log) => (
                    <div 
                      key={log.id}
                      className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-100 text-xs">
                        <div className="space-y-0.5">
                          <span className="font-bold text-forest bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px] uppercase mr-2">
                            {log.type}
                          </span>
                          <strong className="text-gray-900 text-sm">{log.subject}</strong>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-gray-500">To: <strong>{log.to}</strong></span>
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold text-[10px]">
                            {log.status}
                          </span>
                        </div>
                      </div>

                      {log.htmlPreview && (
                        <div className="pt-1">
                          <button
                            onClick={() => setSelectedPreviewHtml(selectedPreviewHtml === log.htmlPreview ? null : (log.htmlPreview || null))}
                            className="text-xs font-bold text-forest hover:text-emerald-800 flex items-center gap-1.5 bg-slate-100 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{selectedPreviewHtml === log.htmlPreview ? 'Hide HTML Email Preview' : 'View Dispatched HTML Email Content'}</span>
                          </button>

                          {selectedPreviewHtml === log.htmlPreview && (
                            <div className="mt-3 p-4 bg-slate-900 rounded-2xl border border-gray-800 overflow-x-auto">
                              <p className="text-[11px] text-emerald-400 font-mono mb-2 font-bold uppercase">Rendered Email Body Preview:</p>
                              <div 
                                className="bg-white rounded-xl p-4 text-black text-sm"
                                dangerouslySetInnerHTML={{ __html: log.htmlPreview }} 
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-gray-600">
            <ShieldCheck className="w-4 h-4 text-forest" />
            <span>Automated Quote Alerts active for <strong className="text-gray-900">{adminEmail}</strong></span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded-xl transition-all"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
