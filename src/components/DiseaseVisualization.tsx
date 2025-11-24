import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Scenario {
  id: string;
  title: string;
  description: string;
  probability: number;
  timeline: string;
  symptoms: string[];
  treatment: string[];
  outcome: 'positive' | 'stable' | 'negative';
  color: string;
}

const DiseaseVisualization = () => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const currentStatus = {
    diagnosis: 'Гипотиреоз неуточненный (E03.9)',
    diagnosisDate: '20 сен 2024',
    severity: 'Низкая',
    currentTSH: '3.2 мМЕ/л',
    normalTSH: '0.4-4.0 мМЕ/л',
    symptoms: [
      { name: 'Утомляемость', level: 40, present: true },
      { name: 'Холодная непереносимость', level: 30, present: true },
      { name: 'Сухость кожи', level: 25, present: true },
      { name: 'Запоры', level: 20, present: false },
      { name: 'Увеличение веса', level: 15, present: false },
      { name: 'Депрессия', level: 10, present: false }
    ],
    riskFactors: [
      'Семейная история щитовидной железы (мать, тетя)',
      'Женский пол',
      'Возраст 29 лет'
    ]
  };

  const scenarios: Scenario[] = [
    {
      id: 'optimal',
      title: 'Оптимальный сценарий',
      description: 'Своевременная диагностика и правильно подобранная терапия приводят к полной компенсации',
      probability: 65,
      timeline: '3-6 месяцев',
      symptoms: [
        'Нормализация ТТГ до 1.0-2.5 мМЕ/л',
        'Исчезновение утомляемости',
        'Улучшение состояния кожи',
        'Восстановление энергии и настроения',
        'Нормализация веса'
      ],
      treatment: [
        'Левотироксин 25-50 мкг/сутки с титрацией',
        'Контроль ТТГ каждые 6-8 недель',
        'Достижение целевого ТТГ 1.0-2.5 мМЕ/л',
        'Прием препарата натощак утром',
        'Достаточное потребление йода (150 мкг/день)',
        'Наблюдение эндокринолога каждые 6 месяцев'
      ],
      outcome: 'positive',
      color: 'from-green-500/20 to-green-500/5'
    },
    {
      id: 'stable',
      title: 'Стабильный сценарий',
      description: 'Субклинический гипотиреоз остается стабильным при динамическом наблюдении',
      probability: 25,
      timeline: '6-12 месяцев',
      symptoms: [
        'ТТГ стабильно в пределах 2.5-4.0 мМЕ/л',
        'Минимальные симптомы',
        'Легкая утомляемость сохраняется',
        'Функция щитовидной железы компенсирована',
        'Качество жизни не страдает'
      ],
      treatment: [
        'Динамическое наблюдение без лечения',
        'Контроль ТТГ каждые 3-6 месяцев',
        'УЗИ щитовидной железы ежегодно',
        'Коррекция питания (йод, селен)',
        'Мониторинг антител к ТПО',
        'Готовность начать терапию при ухудшении'
      ],
      outcome: 'stable',
      color: 'from-blue-500/20 to-blue-500/5'
    },
    {
      id: 'progression',
      title: 'Прогрессирующий сценарий',
      description: 'Субклинический гипотиреоз переходит в манифестный при отсутствии лечения',
      probability: 8,
      timeline: '1-2 года',
      symptoms: [
        'ТТГ повышается >10 мМЕ/л',
        'Выраженная утомляемость и слабость',
        'Увеличение веса на 5-10 кг',
        'Отечность лица и конечностей',
        'Депрессивное настроение',
        'Замедление сердечного ритма',
        'Выраженная сухость кожи'
      ],
      treatment: [
        'Немедленное начало заместительной терапии',
        'Левотироксин 50-100 мкг/сутки',
        'Частый контроль ТТГ (каждые 4 недели)',
        'Коррекция дозы до нормализации',
        'Лечение сопутствующих симптомов',
        'Психологическая поддержка'
      ],
      outcome: 'negative',
      color: 'from-red-500/20 to-red-500/5'
    },
    {
      id: 'autoimmune',
      title: 'Аутоиммунный сценарий',
      description: 'Развитие аутоиммунного тиреоидита (болезнь Хашимото)',
      probability: 2,
      timeline: '6-18 месяцев',
      symptoms: [
        'Высокий уровень антител к ТПО (>100 МЕ/мл)',
        'ТТГ >5 мМЕ/л',
        'Увеличение щитовидной железы (зоб)',
        'Неравномерная эхоструктура на УЗИ',
        'Прогрессирующее снижение функции',
        'Риск развития других аутоиммунных заболеваний'
      ],
      treatment: [
        'Левотироксин пожизненно',
        'Контроль антител к ТПО ежегодно',
        'УЗИ щитовидной железы каждые 6 месяцев',
        'Исключение других аутоиммунных патологий',
        'Селен 200 мкг/день (снижает антитела)',
        'Регулярное наблюдение эндокринолога'
      ],
      outcome: 'negative',
      color: 'from-orange-500/20 to-orange-500/5'
    }
  ];

  const diseaseStages = [
    { 
      stage: 'Норма', 
      tsh: '0.4-2.5', 
      description: 'Эутиреоз - нормальная функция щитовидной железы',
      status: 'normal'
    },
    { 
      stage: 'Субклинический', 
      tsh: '2.5-10', 
      description: 'Повышенный ТТГ при нормальном Т4, минимальные симптомы',
      status: 'current'
    },
    { 
      stage: 'Манифестный', 
      tsh: '>10', 
      description: 'Высокий ТТГ и низкий Т4, выраженные симптомы',
      status: 'risk'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Визуализация заболевания: Гипотиреоз</h2>
        <p className="text-muted-foreground">
          Прогностические сценарии развития заболевания
        </p>
      </div>

      <Card className="bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-background border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Activity" size={24} />
            Текущее состояние
          </CardTitle>
          <CardDescription>Диагноз: {currentStatus.diagnosis}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Дата диагностики:</span>
                <span className="font-medium">{currentStatus.diagnosisDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Тяжесть:</span>
                <Badge variant="outline">{currentStatus.severity}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Текущий ТТГ:</span>
                <span className="font-medium text-green-500">{currentStatus.currentTSH}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Норма ТТГ:</span>
                <span className="text-xs">{currentStatus.normalTSH}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Факторы риска:</h4>
              <ul className="space-y-1">
                {currentStatus.riskFactors.map((factor, idx) => (
                  <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                    <Icon name="AlertCircle" size={12} className="text-orange-500 mt-0.5" />
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Выраженность симптомов:</h4>
            {currentStatus.symptoms.map((symptom, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span>{symptom.name}</span>
                    {symptom.present ? (
                      <Badge variant="secondary" className="text-xs">Присутствует</Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">Отсутствует</Badge>
                    )}
                  </div>
                  <span className="text-muted-foreground">{symptom.level}%</span>
                </div>
                <Progress value={symptom.level} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="TrendingUp" size={24} />
            Стадии заболевания
          </CardTitle>
          <CardDescription>
            Прогрессия гипотиреоза от нормы до манифестной формы
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {diseaseStages.map((stage, idx) => (
              <Card 
                key={idx} 
                className={`${
                  stage.status === 'current' ? 'border-blue-500 border-2 bg-blue-500/5' : 
                  stage.status === 'risk' ? 'border-red-500/50' : 
                  ''
                }`}
              >
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{stage.stage}</h4>
                    {stage.status === 'current' && (
                      <Badge variant="default">Сейчас здесь</Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">ТТГ (мМЕ/л)</p>
                    <p className="text-2xl font-bold">{stage.tsh}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{stage.description}</p>
                  {idx < diseaseStages.length - 1 && (
                    <Icon name="ArrowRight" className="text-muted-foreground" size={20} />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Сценарии развития заболевания</h3>
          <Badge variant="outline">
            <Icon name="Info" size={12} />
            Основано на клинических данных
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {scenarios.map((scenario) => (
            <Card 
              key={scenario.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedScenario === scenario.id ? 'ring-2 ring-primary' : ''
              } bg-gradient-to-br ${scenario.color}`}
              onClick={() => setSelectedScenario(selectedScenario === scenario.id ? null : scenario.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {scenario.outcome === 'positive' && <Icon name="TrendingUp" className="text-green-500" size={20} />}
                      {scenario.outcome === 'stable' && <Icon name="Minus" className="text-blue-500" size={20} />}
                      {scenario.outcome === 'negative' && <Icon name="TrendingDown" className="text-red-500" size={20} />}
                      {scenario.title}
                    </CardTitle>
                    <CardDescription>{scenario.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{scenario.probability}%</p>
                    <p className="text-xs text-muted-foreground">вероятность</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium">Временной горизонт: {scenario.timeline}</span>
                </div>

                <Progress value={scenario.probability} className="h-2" />

                {selectedScenario === scenario.id && (
                  <div className="space-y-4 pt-4 border-t animate-fade-in">
                    <div className="space-y-2">
                      <h5 className="text-sm font-semibold flex items-center gap-2">
                        <Icon name="Activity" size={16} />
                        Ожидаемые проявления:
                      </h5>
                      <ul className="space-y-1">
                        {scenario.symptoms.map((symptom, idx) => (
                          <li key={idx} className="text-xs flex items-start gap-2">
                            <span className={`mt-1 ${
                              scenario.outcome === 'positive' ? 'text-green-500' : 
                              scenario.outcome === 'stable' ? 'text-blue-500' : 
                              'text-red-500'
                            }`}>•</span>
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h5 className="text-sm font-semibold flex items-center gap-2">
                        <Icon name="Pill" size={16} />
                        План лечения:
                      </h5>
                      <ul className="space-y-1">
                        {scenario.treatment.map((treatment, idx) => (
                          <li key={idx} className="text-xs flex items-start gap-2">
                            <Icon name="CheckCircle2" size={12} className="text-primary mt-0.5" />
                            <span>{treatment}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {!selectedScenario && (
                  <Button variant="outline" size="sm" className="w-full">
                    <Icon name="Eye" size={14} />
                    Подробнее
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 text-sm">
            <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <p className="font-medium">О прогностических сценариях</p>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Вероятности рассчитаны на основе клинических исследований и текущего состояния пациента</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Оптимальный сценарий наиболее вероятен при своевременном начале лечения</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Прогноз может меняться в зависимости от соблюдения рекомендаций и динамики показателей</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Регулярный мониторинг ТТГ и консультации эндокринолога критически важны</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiseaseVisualization;
