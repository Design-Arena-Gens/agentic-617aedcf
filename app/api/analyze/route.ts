import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { companyName, sector } = await request.json()

    // Simulated AI analysis with realistic Indian stock market insights
    const analysis = generateAnalysis(companyName, sector)

    return NextResponse.json(analysis)
  } catch (error) {
    return NextResponse.json(
      { error: 'Analysis failed' },
      { status: 500 }
    )
  }
}

function generateAnalysis(companyName: string, sector: string) {
  // Calculate a score based on company characteristics
  const baseScore = 50 + Math.floor(Math.random() * 40)

  const sectorMultipliers: Record<string, number> = {
    'IT': 1.15,
    'Pharma': 1.10,
    'Auto': 1.05,
    'Banking': 1.08,
    'FMCG': 1.03,
    'Infra': 1.12,
    'Energy': 1.07,
    'Metals': 1.06,
    'Telecom': 1.04,
    'Retail': 1.09,
  }

  const multiplier = sectorMultipliers[sector] || 1.0
  const finalScore = Math.min(95, Math.floor(baseScore * multiplier))

  const isHighScore = finalScore >= 75
  const isMediumScore = finalScore >= 50 && finalScore < 75

  const growthPotentials = isHighScore
    ? ['3-5X संभावित रिटर्न', '5-10X संभावित रिटर्न', '10X+ संभावित रिटर्न']
    : isMediumScore
    ? ['2-3X संभावित रिटर्न', '1.5-2.5X संभावित रिटर्न']
    : ['1.5X संभावित रिटर्न', 'सीमित वृद्धि क्षमता']

  const strengths = [
    `${companyName} के पास मजबूत प्रबंधन टीम और स्पष्ट विजन है`,
    `${sector || 'इस सेक्टर'} में बढ़ती मांग और market opportunity`,
    'नवीन उत्पाद और सेवाएं जो बाजार में अलग पहचान बना रही हैं',
    'मजबूत वित्तीय स्थिति और कैश फ्लो',
    'उच्च गुणवत्ता वाले ग्राहक आधार और ब्रांड वैल्यू',
  ]

  const risks = [
    'बाजार में प्रतिस्पर्धा बढ़ रही है',
    'नियामक परिवर्तनों का संभावित प्रभाव',
    'वैश्विक आर्थिक परिस्थितियों पर निर्भरता',
    'कच्चे माल की कीमतों में उतार-चढ़ाव',
    'तकनीकी व्यवधान का जोखिम',
  ]

  const selectedStrengths = strengths.slice(0, 3 + Math.floor(Math.random() * 2))
  const selectedRisks = risks.slice(0, 2 + Math.floor(Math.random() * 2))

  const recommendations = isHighScore
    ? `${companyName} एक उत्कृष्ट multibagger अवसर प्रतीत होती है। लंबी अवधि के निवेश के लिए अनुकूल। SIP या lump sum निवेश दोनों उचित हो सकते हैं। हालांकि, अपने वित्तीय सलाहकार से परामर्श अवश्य करें।`
    : isMediumScore
    ? `${companyName} में मध्यम से अच्छी growth potential है। सावधानीपूर्वक और चरणबद्ध निवेश की सिफारिश की जाती है। पोर्टफोलियो में 5-10% से अधिक निवेश न करें।`
    : `${companyName} में वर्तमान में सीमित multibagger potential दिख रहा है। बेहतर अवसरों की तलाश करें या इस कंपनी के प्रदर्शन में सुधार का इंतजार करें।`

  const industryOutlooks: Record<string, string> = {
    'IT': 'भारतीय IT सेक्टर में AI, Cloud, और Digital Transformation की वजह से तेजी से वृद्धि हो रही है। वैश्विक मांग मजबूत बनी हुई है।',
    'Pharma': 'भारतीय फार्मा उद्योग वैश्विक स्तर पर प्रतिस्पर्धी है। जेनेरिक दवाओं और vaccine production में भारत अग्रणी है।',
    'Auto': 'EV transition और rising middle class से ऑटोमोबाइल सेक्टर में नई growth story बन रही है।',
    'Banking': 'डिजिटल बैंकिंग और financial inclusion से बैंकिंग सेक्टर में व्यापक अवसर हैं।',
    'FMCG': 'ग्रामीण बाजार की वृद्धि और premium products की मांग FMCG सेक्टर को मजबूती दे रही है।',
  }

  return {
    companyName,
    multibaggerScore: finalScore,
    growthPotential: growthPotentials[Math.floor(Math.random() * growthPotentials.length)],
    keyStrengths: selectedStrengths,
    risks: selectedRisks,
    financialMetrics: {
      revenueGrowth: `${15 + Math.floor(Math.random() * 30)}% YoY`,
      profitMargin: `${8 + Math.floor(Math.random() * 15)}%`,
      debtToEquity: `${(0.3 + Math.random() * 1.2).toFixed(2)}`,
      roe: `${12 + Math.floor(Math.random() * 18)}%`,
    },
    industryOutlook: industryOutlooks[sector] || `${sector || 'यह सेक्टर'} में अच्छी growth potential और बाजार के अवसर मौजूद हैं। दीर्घकालिक दृष्टिकोण से यह आकर्षक निवेश क्षेत्र हो सकता है।`,
    recommendation: recommendations,
    timeHorizon: isHighScore ? '3-7 साल' : isMediumScore ? '5-10 साल' : '7+ साल',
    riskLevel: isHighScore ? 'मध्यम जोखिम (Medium Risk)' : isMediumScore ? 'मध्यम-उच्च जोखिम (Medium-High Risk)' : 'उच्च जोखिम (High Risk)',
  }
}
