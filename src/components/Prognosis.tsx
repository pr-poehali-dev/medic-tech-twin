import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface PrognosisScenario {
  id: string;
  condition: string;
  currentStatus: string;
  scenarios: {
    type: 'best' | 'moderate' | 'requires_attention';
    title: string;
    description: string;
    probability: number;
    timeframe: string;
    factors: string[];
    recommendations: string[];
  }[];
}

const Prognosis = () => {
  const prognosisData: PrognosisScenario[] = [
    {
      id: '1',
      condition: 'Артериальная гипертензия',
      currentStatus: 'Под контролем',
      scenarios: [
        {
          type: 'best',
          title: 'Благоприятный прогноз',
          description: 'Стабилизация давления в пределах нормы, снижение риска осложнений',
          probability: 75,
          timeframe: '6-12 месяцев',
          factors: [
            'Регулярный прием Лизиноприла',
            'Контроль давления 2 раза в день',
            'Снижение потребления соли',
            'Умеренная физическая активность'
          ],
          recommendations: [
            'Продолжать текущую терапию',
            'Поддерживать активный образ жизни',
            'Контролировать вес'
          ]
        },
        {
          type: 'moderate',
          title: 'Умеренный прогноз',
          description: 'Периодические скачки давления, требуется коррекция терапии',
          probability: 20,
          timeframe: '3-6 месяцев',
          factors: [
            'Нерегулярный прием препаратов',
            'Стрессовые ситуации на работе',
            'Недостаточный контроль питания'
          ],
          recommendations: [
            'Усилить контроль приема лекарств',
            'Консультация кардиолога для коррекции дозировок',
            'Техники управления стрессом'
          ]
        },
        {
          type: 'requires_attention',
          title: 'Требует внимания',
          description: 'Высокий риск гипертонического криза и осложнений',
          probability: 5,
          timeframe: '1-3 месяца',
          factors: [
            'Отсутствие лечения',
            'Высокие показатели давления',
            'Несоблюдение рекомендаций'
          ],
          recommendations: [
            'Срочная консультация кардиолога',
            'Коррекция терапии',
            'Возможна госпитализация для подбора лечения'
          ]
        }
      ]
    },
    {
      id: '2',
      condition: 'Предиабет (риск диабета 2 типа)',
      currentStatus: 'Начальная стадия',
      scenarios: [
        {
          type: 'best',
          title: 'Возврат к норме',
          description: 'Нормализация уровня глюкозы, предотвращение развития диабета',
          probability: 65,
          timeframe: '12-18 месяцев',
          factors: [
            'Прием Метформина по назначению',
            'Снижение веса на 5-7%',
            'Регулярные физические нагрузки',
            'Контроль углеводов в рационе'
          ],
          recommendations: [
            'Продолжать прием Метформина',
            'Консультации с диетологом',
            'Ходьба 10000 шагов ежедневно'
          ]
        },
        {
          type: 'moderate',
          title: 'Стабилизация состояния',
          description: 'Удержание показателей на пограничном уровне',
          probability: 25,
          timeframe: '6-12 месяцев',
          factors: [
            'Частичное соблюдение диеты',
            'Нерегулярная физическая активность',
            'Превышение веса на 10-15 кг'
          ],
          recommendations: [
            'Усилить контроль питания',
            'Увеличить физическую активность',
            'Регулярный контроль глюкозы'
          ]
        },
        {
          type: 'requires_attention',
          title: 'Развитие диабета 2 типа',
          description: 'Переход предиабета в сахарный диабет',
          probability: 10,
          timeframe: '3-6 месяцев',
          factors: [
            'Отсутствие лечения',
            'Несоблюдение диеты',
            'Набор веса',
            'Отсутствие физической активности'
          ],
          recommendations: [
            'Срочная консультация эндокринолога',
            'Пересмотр терапии',
            'Строгая диета и режим'
          ]
        }
      ]
    }
  ];

  const getScenarioColor = (type: string) => {
    switch (type) {
      case 'best': return 'default';
      case 'moderate': return 'secondary';
      case 'requires_attention': return 'destructive';
      default: return 'default';
    }
  };

  const getScenarioIcon = (type: string) => {
    switch (type) {
      case 'best': return 'TrendingUp';
      case 'moderate': return 'TrendingDown';
      case 'requires_attention': return 'AlertTriangle';
      default: return 'Info';
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Прогноз течения заболеваний</h2>
        <p className="text-muted-foreground">
          AI-анализ возможных сценариев развития на основе ваших данных
        </p>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div className="text-sm space-y-1">
              <p className="font-medium">Информация о прогнозах</p>
              <p className="text-muted-foreground">
                Прогнозы основаны на анализе ваших показателей здоровья, приема лекарств и образа жизни. 
                Это не диагноз, а вероятностная оценка для мотивации следовать рекомендациям врача.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {prognosisData.map((prognosis) => (
        <Card key={prognosis.id}>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Activity" size={24} />
                  {prognosis.condition}
                </CardTitle>
                <CardDescription className="mt-2">
                  Текущий статус: <span className="font-medium text-foreground">{prognosis.currentStatus}</span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {prognosis.scenarios.map((scenario, idx) => (
              <div key={idx}>
                {idx > 0 && <Separator className="mb-6" />}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <Icon 
                        name={getScenarioIcon(scenario.type)} 
                        size={24} 
                        className={scenario.type === 'best' ? 'text-secondary' : scenario.type === 'moderate' ? 'text-primary' : 'text-destructive'}
                      />
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-lg">{scenario.title}</h4>
                          <Badge variant={getScenarioColor(scenario.type) as any}>
                            Вероятность {scenario.probability}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{scenario.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Icon name="Clock" size={12} />
                          <span>Прогноз на {scenario.timeframe}</span>
                        </div>
                        <Progress value={scenario.probability} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 pl-9">
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm flex items-center gap-2">
                        <Icon name="ListChecks" size={16} />
                        Ключевые факторы
                      </h5>
                      <ul className="space-y-1">
                        {scenario.factors.map((factor, fIdx) => (
                          <li key={fIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{factor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-medium text-sm flex items-center gap-2">
                        <Icon name="Lightbulb" size={16} />
                        Рекомендации
                      </h5>
                      <ul className="space-y-1">
                        {scenario.recommendations.map((rec, rIdx) => (
                          <li key={rIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-secondary mt-1">✓</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Prognosis;
