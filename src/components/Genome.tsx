import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface GeneticMarker {
  gene: string;
  variant: string;
  status: 'normal' | 'variant' | 'mutation';
  risk: 'low' | 'medium' | 'high';
  description: string;
  recommendations: string[];
}

interface ChromosomeData {
  number: string;
  size: string;
  genes: number;
  variants: number;
}

const Genome = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('cardiovascular');

  const patientInfo = {
    name: 'Ким Джису',
    age: 29,
    sex: 'Женский',
    ethnicity: 'Азиатская (корейская)',
    bloodType: 'A (II) Rh+',
    sequencingDate: '15 октября 2024',
    coverage: '30x',
    variants: 4235167
  };

  const chromosomes: ChromosomeData[] = [
    { number: '1', size: '248 Мбп', genes: 2058, variants: 385421 },
    { number: '2', size: '242 Мбп', genes: 1309, variants: 368234 },
    { number: '3', size: '198 Мбп', genes: 1078, variants: 298765 },
    { number: '4', size: '190 Мбп', genes: 752, variants: 287432 },
    { number: '5', size: '181 Мбп', genes: 876, variants: 273128 },
    { number: '6', size: '170 Мбп', genes: 1048, variants: 256891 },
    { number: '7', size: '159 Мбп', genes: 989, variants: 241567 },
    { number: '8', size: '145 Мбп', genes: 677, variants: 219834 },
    { number: '9', size: '138 Мбп', genes: 786, variants: 209123 },
    { number: '10', size: '133 Мбп', genes: 733, variants: 201456 },
    { number: '11', size: '135 Мбп', genes: 1298, variants: 204782 },
    { number: '12', size: '133 Мбп', genes: 1026, variants: 201893 },
    { number: '13', size: '114 Мбп', genes: 327, variants: 172456 },
    { number: '14', size: '107 Мбп', genes: 830, variants: 162178 },
    { number: '15', size: '101 Мбп', genes: 613, variants: 153421 },
    { number: '16', size: '90 Мбп', genes: 873, variants: 136589 },
    { number: '17', size: '83 Мбп', genes: 1197, variants: 125867 },
    { number: '18', size: '80 Мбп', genes: 270, variants: 121234 },
    { number: '19', size: '58 Мбп', genes: 1472, variants: 87965 },
    { number: '20', size: '64 Мбп', genes: 544, variants: 97123 },
    { number: '21', size: '46 Мбп', genes: 234, variants: 69782 },
    { number: '22', size: '50 Мбп', genes: 488, variants: 75891 },
    { number: 'X', size: '155 Мбп', genes: 842, variants: 235467 },
    { number: 'Y', size: '-', genes: 0, variants: 0 }
  ];

  const geneticMarkers: Record<string, GeneticMarker[]> = {
    hereditary: [
      {
        gene: 'Семейный анамнез',
        variant: 'Сердечно-сосудистые заболевания',
        status: 'variant',
        risk: 'medium',
        description: 'Дедушка по материнской линии — инфаркт миокарда в 62 года. Бабушка по отцовской линии — артериальная гипертензия с 55 лет.',
        recommendations: ['Контроль артериального давления с 30 лет', 'Липидограмма ежегодно', 'ЭКГ и эхокардиография при симптомах', 'Ограничение соли и насыщенных жиров']
      },
      {
        gene: 'Семейный анамнез',
        variant: 'Сахарный диабет 2 типа',
        status: 'variant',
        risk: 'medium',
        description: 'Мать — диабет 2 типа, диагностирован в 48 лет. Тетя по материнской линии — преддиабет.',
        recommendations: ['Контроль глюкозы натощак и HbA1c ежегодно', 'Поддержание нормального веса (ИМТ 18.5-24.9)', 'Ограничение быстрых углеводов', 'Физическая активность минимум 150 мин/неделю']
      },
      {
        gene: 'Семейный анамнез',
        variant: 'Онкологические заболевания',
        status: 'variant',
        risk: 'medium',
        description: 'Бабушка по материнской линии — рак молочной железы в 67 лет (неизвестно BRCA-статус). Дедушка по отцовской линии — рак легких в 70 лет (курильщик).',
        recommendations: ['Маммография с 40 лет ежегодно (на 10 лет раньше стандартного)', 'МРТ молочных желез по показаниям', 'Генетическое тестирование BRCA1/2 рассмотреть', 'Отказ от курения (активного и пассивного)']
      },
      {
        gene: 'Семейный анамнез',
        variant: 'Щитовидная железа',
        status: 'variant',
        risk: 'low',
        description: 'Мать — гипотиреоз, диагностирован в 45 лет. Тетя — узловой зоб.',
        recommendations: ['Контроль ТТГ каждые 3-5 лет начиная с 35 лет', 'УЗИ щитовидной железы при отклонениях', 'Достаточное потребление йода']
      },
      {
        gene: 'Семейный анамнез',
        variant: 'Остеопороз',
        status: 'normal',
        risk: 'medium',
        description: 'Бабушка по материнской линии — остеопороз, перелом шейки бедра в 72 года.',
        recommendations: ['Денситометрия с 65 лет (или с менопаузы)', 'Достаточное потребление кальция (1000-1200 мг/день)', 'Витамин D (контроль уровня в крови)', 'Силовые упражнения для укрепления костей']
      },
      {
        gene: 'Семейный анамнез',
        variant: 'Желудочно-кишечный тракт',
        status: 'normal',
        risk: 'low',
        description: 'Отец — язвенная болезнь желудка (H. pylori), вылечена. Нет случаев рака ЖКТ.',
        recommendations: ['Тест на H. pylori при симптомах', 'Колоноскопия с 45 лет (стандартный скрининг)', 'Избегать НПВС натощак']
      }
    ],
    cardiovascular: [
      {
        gene: 'APOE',
        variant: 'ε3/ε3',
        status: 'normal',
        risk: 'low',
        description: 'Нормальный генотип. Низкий риск сердечно-сосудистых заболеваний и болезни Альцгеймера.',
        recommendations: ['Стандартная профилактика', 'Здоровое питание', 'Регулярная физическая активность']
      },
      {
        gene: 'MTHFR',
        variant: 'C677T (гетерозигота)',
        status: 'variant',
        risk: 'medium',
        description: 'Умеренное снижение активности фермента. Может влиять на уровень гомоцистеина.',
        recommendations: ['Контроль уровня гомоцистеина', 'Дополнительный прием фолиевой кислоты', 'Витамин B12']
      },
      {
        gene: 'ACE',
        variant: 'I/D (гетерозигота)',
        status: 'normal',
        risk: 'low',
        description: 'Сбалансированный генотип. Нормальная регуляция артериального давления.',
        recommendations: ['Стандартный контроль давления', 'Ограничение соли']
      }
    ],
    metabolism: [
      {
        gene: 'FTO',
        variant: 'rs9939609 (A/T)',
        status: 'variant',
        risk: 'medium',
        description: 'Умеренно повышенная склонность к набору веса. Генотип связан с повышением ИМТ.',
        recommendations: ['Контроль калорийности питания', 'Регулярная физическая активность', 'Избегать переедания']
      },
      {
        gene: 'PPARG',
        variant: 'Pro12Ala (Pro/Pro)',
        status: 'normal',
        risk: 'low',
        description: 'Нормальная чувствительность к инсулину. Низкий риск диабета 2 типа.',
        recommendations: ['Стандартная профилактика диабета', 'Сбалансированное питание']
      },
      {
        gene: 'TCF7L2',
        variant: 'rs7903146 (C/T)',
        status: 'variant',
        risk: 'medium',
        description: 'Умеренно повышенный риск развития диабета 2 типа.',
        recommendations: ['Регулярный контроль уровня глюкозы', 'Ограничение быстрых углеводов', 'Поддержание нормального веса']
      }
    ],
    pharmacogenetics: [
      {
        gene: 'CYP2D6',
        variant: '*1/*1 (нормальный метаболизатор)',
        status: 'normal',
        risk: 'low',
        description: 'Нормальная скорость метаболизма многих лекарств (антидепрессанты, бета-блокаторы).',
        recommendations: ['Стандартные дозировки препаратов', 'Нет особых ограничений']
      },
      {
        gene: 'CYP2C9',
        variant: '*1/*2 (промежуточный метаболизатор)',
        status: 'variant',
        risk: 'medium',
        description: 'Умеренно сниженная активность фермента. Влияет на метаболизм варфарина, ибупрофена.',
        recommendations: ['Возможна коррекция дозировок НПВС', 'Осторожность с антикоагулянтами', 'Консультация врача']
      },
      {
        gene: 'SLCO1B1',
        variant: 'rs4149056 (T/T)',
        status: 'normal',
        risk: 'low',
        description: 'Нормальный транспорт статинов. Низкий риск побочных эффектов от статинов.',
        recommendations: ['Стандартные дозировки статинов при необходимости']
      }
    ],
    oncology: [
      {
        gene: 'BRCA1',
        variant: 'Нет патогенных мутаций',
        status: 'normal',
        risk: 'low',
        description: 'Отсутствие наследственных мутаций, связанных с раком молочной железы и яичников.',
        recommendations: ['Стандартный скрининг', 'Самообследование молочных желез', 'Маммография по возрасту']
      },
      {
        gene: 'BRCA2',
        variant: 'Нет патогенных мутаций',
        status: 'normal',
        risk: 'low',
        description: 'Отсутствие наследственных мутаций. Средний популяционный риск.',
        recommendations: ['Регулярные профилактические осмотры', 'Здоровый образ жизни']
      },
      {
        gene: 'TP53',
        variant: 'Нет патогенных мутаций',
        status: 'normal',
        risk: 'low',
        description: 'Ген-супрессор опухолей функционирует нормально.',
        recommendations: ['Стандартная онкологическая настороженность', 'Избегать канцерогенов']
      }
    ],
    traits: [
      {
        gene: 'MC1R',
        variant: 'Темные волосы, темные глаза',
        status: 'normal',
        risk: 'low',
        description: 'Генотип соответствует азиатскому фенотипу. Темная пигментация.',
        recommendations: ['Стандартная защита от солнца (SPF 30+)']
      },
      {
        gene: 'HERC2/OCA2',
        variant: 'Карие глаза',
        status: 'normal',
        risk: 'low',
        description: 'Генетически детерминированный цвет глаз.',
        recommendations: []
      },
      {
        gene: 'EDAR',
        variant: 'V370A (восточноазиатский вариант)',
        status: 'normal',
        risk: 'low',
        description: 'Характерен для восточноазиатских популяций. Влияет на структуру волос и зубов.',
        recommendations: []
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'default';
      case 'variant': return 'secondary';
      case 'mutation': return 'destructive';
      default: return 'default';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'default';
      case 'medium': return 'secondary';
      case 'high': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'normal': return 'Норма';
      case 'variant': return 'Вариант';
      case 'mutation': return 'Мутация';
      default: return 'Норма';
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'low': return 'Низкий';
      case 'medium': return 'Средний';
      case 'high': return 'Высокий';
      default: return 'Низкий';
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Геномный профиль пациента</h2>
        <p className="text-muted-foreground">
          Анализ полного генома для персонализированной медицины
        </p>
      </div>

      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Dna" size={24} />
            Информация о пациенте
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">ФИО</p>
              <p className="font-medium">{patientInfo.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Возраст</p>
              <p className="font-medium">{patientInfo.age} лет</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Пол</p>
              <p className="font-medium">{patientInfo.sex}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Этническая принадлежность</p>
              <p className="font-medium">{patientInfo.ethnicity}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Группа крови</p>
              <p className="font-medium">{patientInfo.bloodType}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Дата секвенирования</p>
              <p className="font-medium">{patientInfo.sequencingDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Покрытие</p>
              <p className="font-medium">{patientInfo.coverage}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Выявлено вариантов</p>
              <p className="font-medium">{patientInfo.variants.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Layers" size={24} />
            Карта хромосом
          </CardTitle>
          <CardDescription>
            Распределение генов и вариантов по хромосомам
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {chromosomes.map((chr) => (
              <Card key={chr.number} className={chr.number === 'Y' ? 'opacity-50' : ''}>
                <CardContent className="pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">Chr {chr.number}</span>
                    {chr.number === 'Y' && <Badge variant="outline" className="text-xs">N/A</Badge>}
                  </div>
                  {chr.number !== 'Y' && (
                    <>
                      <p className="text-xs text-muted-foreground">{chr.size}</p>
                      <Separator />
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Гены:</span>
                          <span className="font-medium">{chr.genes}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Варианты:</span>
                          <span className="font-medium">{chr.variants.toLocaleString()}</span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="FileSearch" size={24} />
            Анализ генетических маркеров
          </CardTitle>
          <CardDescription>
            Клинически значимые варианты генов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              <TabsTrigger value="hereditary" className="gap-1">
                <Icon name="Users" size={14} />
                <span className="hidden sm:inline">Семейный анамнез</span>
                <span className="sm:hidden">Семья</span>
              </TabsTrigger>
              <TabsTrigger value="cardiovascular" className="gap-1">
                <Icon name="Heart" size={14} />
                <span className="hidden sm:inline">Кардио</span>
              </TabsTrigger>
              <TabsTrigger value="metabolism" className="gap-1">
                <Icon name="Activity" size={14} />
                <span className="hidden sm:inline">Метаболизм</span>
              </TabsTrigger>
              <TabsTrigger value="pharmacogenetics" className="gap-1">
                <Icon name="Pill" size={14} />
                <span className="hidden sm:inline">Фармако</span>
              </TabsTrigger>
              <TabsTrigger value="oncology" className="gap-1">
                <Icon name="ShieldAlert" size={14} />
                <span className="hidden sm:inline">Онкология</span>
              </TabsTrigger>
              <TabsTrigger value="traits" className="gap-1">
                <Icon name="User" size={14} />
                <span className="hidden sm:inline">Признаки</span>
              </TabsTrigger>
            </TabsList>

            {Object.entries(geneticMarkers).map(([category, markers]) => (
              <TabsContent key={category} value={category} className="space-y-4 mt-4">
                {markers.map((marker, idx) => (
                  <Card key={idx}>
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold text-lg">{marker.gene}</h4>
                            <Badge variant={getStatusColor(marker.status) as any}>
                              {getStatusLabel(marker.status)}
                            </Badge>
                            <Badge variant={getRiskColor(marker.risk) as any}>
                              Риск: {getRiskLabel(marker.risk)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground font-mono">
                            {marker.variant}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm">{marker.description}</p>

                      {marker.recommendations.length > 0 && (
                        <>
                          <Separator />
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium flex items-center gap-2">
                              <Icon name="Lightbulb" size={16} />
                              Рекомендации
                            </h5>
                            <ul className="space-y-1">
                              {marker.recommendations.map((rec, rIdx) => (
                                <li key={rIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 text-sm">
            <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <p className="font-medium">Важная информация о генетическом тестировании</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Генетические данные показывают предрасположенность, но не определяют судьбу</li>
                <li>• Образ жизни, питание и окружающая среда играют ключевую роль</li>
                <li>• Все результаты требуют консультации с врачом-генетиком</li>
                <li>• Данные защищены и конфиденциальны</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Genome;