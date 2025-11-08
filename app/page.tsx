'use client'

import { useState } from 'react'

interface AnalysisResult {
  companyName: string
  multibaggerScore: number
  growthPotential: string
  keyStrengths: string[]
  risks: string[]
  financialMetrics: {
    revenueGrowth: string
    profitMargin: string
    debtToEquity: string
    roe: string
  }
  industryOutlook: string
  recommendation: string
  timeHorizon: string
  riskLevel: string
}

export default function Home() {
  const [companyName, setCompanyName] = useState('')
  const [sector, setSector] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const analyzeCompany = async () => {
    if (!companyName.trim()) return

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyName, sector }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Analysis error:', error)
      alert('विश्लेषण में त्रुटि हुई। कृपया पुनः प्रयास करें।')
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'score-high'
    if (score >= 50) return 'score-medium'
    return 'score-low'
  }

  const getRiskClass = (risk: string) => {
    if (risk.includes('कम') || risk.includes('Low')) return 'risk-low'
    if (risk.includes('मध्यम') || risk.includes('Medium')) return 'risk-medium'
    return 'risk-high'
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🚀 Indian Multibagger Stock Predictor</h1>
        <p>AI-powered विश्लेषण से जानें कौन सी कंपनी बन सकती है अगला Multibagger</p>
      </div>

      <div className="main-content">
        <div className="input-section">
          <label htmlFor="companyName">कंपनी का नाम / Company Name:</label>
          <input
            id="companyName"
            type="text"
            placeholder="उदाहरण: Tata Motors, Reliance Industries, Infosys"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && analyzeCompany()}
          />
        </div>

        <div className="input-section">
          <label htmlFor="sector">सेक्टर / Sector (Optional):</label>
          <select
            id="sector"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          >
            <option value="">सेक्टर चुनें...</option>
            <option value="IT">IT & Software</option>
            <option value="Pharma">Pharmaceuticals</option>
            <option value="Auto">Automobile</option>
            <option value="Banking">Banking & Finance</option>
            <option value="FMCG">FMCG</option>
            <option value="Infra">Infrastructure</option>
            <option value="Energy">Energy & Power</option>
            <option value="Metals">Metals & Mining</option>
            <option value="Telecom">Telecom</option>
            <option value="Retail">Retail</option>
          </select>
        </div>

        <button
          className="analyze-btn"
          onClick={analyzeCompany}
          disabled={loading || !companyName.trim()}
        >
          {loading ? 'विश्लेषण हो रहा है...' : '🔍 Multibagger विश्लेषण शुरू करें'}
        </button>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>AI द्वारा गहन विश्लेषण किया जा रहा है...</p>
          </div>
        )}

        {result && (
          <div className="results">
            <div className="result-card">
              <h2>📊 {result.companyName} - विश्लेषण रिपोर्ट</h2>

              <div className="metric">
                <span className="metric-label">Multibagger Score:</span>
                <span className={`metric-value ${getScoreColor(result.multibaggerScore)}`}>
                  {result.multibaggerScore}/100
                </span>
              </div>

              <div className="metric">
                <span className="metric-label">Growth Potential:</span>
                <span className="metric-value">{result.growthPotential}</span>
              </div>

              <div className="metric">
                <span className="metric-label">Risk Level:</span>
                <span className="metric-value">
                  <span className={`risk-badge ${getRiskClass(result.riskLevel)}`}>
                    {result.riskLevel}
                  </span>
                </span>
              </div>

              <div className="metric">
                <span className="metric-label">Investment Horizon:</span>
                <span className="metric-value">{result.timeHorizon}</span>
              </div>
            </div>

            <div className="result-card">
              <h2>💰 Financial Metrics</h2>
              <div className="metric">
                <span className="metric-label">Revenue Growth:</span>
                <span className="metric-value">{result.financialMetrics.revenueGrowth}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Profit Margin:</span>
                <span className="metric-value">{result.financialMetrics.profitMargin}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Debt to Equity:</span>
                <span className="metric-value">{result.financialMetrics.debtToEquity}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Return on Equity (ROE):</span>
                <span className="metric-value">{result.financialMetrics.roe}</span>
              </div>
            </div>

            <div className="result-card">
              <div className="analysis-section">
                <h3>✨ प्रमुख शक्तियां (Key Strengths)</h3>
                <ul>
                  {result.keyStrengths.map((strength, idx) => (
                    <li key={idx}>{strength}</li>
                  ))}
                </ul>
              </div>

              <div className="analysis-section">
                <h3>⚠️ जोखिम कारक (Risk Factors)</h3>
                <ul>
                  {result.risks.map((risk, idx) => (
                    <li key={idx}>{risk}</li>
                  ))}
                </ul>
              </div>

              <div className="analysis-section">
                <h3>🏭 Industry Outlook</h3>
                <p>{result.industryOutlook}</p>
              </div>

              <div className="analysis-section">
                <h3>💡 सिफारिश (Recommendation)</h3>
                <p><strong>{result.recommendation}</strong></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
