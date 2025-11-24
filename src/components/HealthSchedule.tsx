import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Checkup {
  age: string;
  period: string;
  examinations: string[];
  specialists: string[];
  completed: boolean;
  nextDate?: string;
}

interface Vaccination {
  vaccine: string;
  age: string;
  doses: number;
  description: string;
  completed: boolean;
  nextDate?: string;
  isRecommended: boolean;
}

const HealthSchedule = () => {
  const currentAge = 29;

  const checkupSchedule: Checkup[] = [
    {
      age: '18-39 лет',
      period: 'Каждые 3 года',
      examinations: [
        'Общий анализ крови',
        'Биохимический анализ крови',
        'Общий анализ мочи',
        'ЭКГ',
        'Флюорография',
        'Измерение артериального давления',
        'Определение уровня глюкозы',
        'Определение холестерина'
      ],
      specialists: [
        'Терапевт',
        'Гинеколог (для женщин)',
        'Стоматолог',
        'Офтальмолог'
      ],
      completed: true,
      nextDate: '2025-11-15'
    },
    {
      age: '40-64 лет',
      period: 'Ежегодно',
      examinations: [
        'Общий анализ крови',
        'Биохимический анализ крови',
        'Общий анализ мочи',
        'ЭКГ',
        'Флюорография (1 раз в 2 года)',
        'Маммография (для женщин)',
        'Измерение ВГД (внутриглазное давление)',
        'Колоноскопия (1 раз в 5 лет)',
        'Определение уровня глюкозы',
        'Определение холестерина'
      ],
      specialists: [
        'Терапевт',
        'Кардиолог',
        'Гинеколог (для женщин)',
        'Невролог',
        'Стоматолог',
        'Офтальмолог',
        'Уролог (для мужчин)'
      ],
      completed: false,
      nextDate: '2036-01-01'
    },
    {
      age: '65+ лет',
      period: 'Ежегодно',
      examinations: [
        'Общий анализ крови',
        'Биохимический анализ крови',
        'Общий анализ мочи',
        'ЭКГ',
        'Эхокардиография',
        'Флюорография',
        'Маммография (для женщин)',
        'УЗИ органов брюшной полости',
        'Колоноскопия (1 раз в 5 лет)',
        'Измерение ВГД',
        'Денситометрия (плотность костей)',
        'Определение уровня глюкозы',
        'Определение холестерина'
      ],
      specialists: [
        'Терапевт',
        'Кардиолог',
        'Невролог',
        'Гинеколог (для женщин)',
        'Офтальмолог',
        'Стоматолог',
        'Уролог (для мужчин)',
        'Эндокринолог'
      ],
      completed: false
    }
  ];

  const vaccinationSchedule: Vaccination[] = [
    {
      vaccine: 'Грипп',
      age: 'Ежегодно',
      doses: 1,
      description: 'Защита от сезонного гриппа. Особенно важна для людей с хроническими заболеваниями.',
      completed: true,
      nextDate: '2025-09-01',
      isRecommended: true
    },
    {
      vaccine: 'COVID-19',
      age: 'По графику',
      doses: 1,
      description: 'Ревакцинация каждые 6-12 месяцев. Актуальный штамм.',
      completed: true,
      nextDate: '2025-06-15',
      isRecommended: true
    },
    {
      vaccine: 'Столбняк и дифтерия (АДС-М)',
      age: 'Каждые 10 лет',
      doses: 1,
      description: 'Обязательная ревакцинация взрослых. Следующая доза в 39 лет.',
      completed: true,
      nextDate: '2034-01-10',
      isRecommended: true
    },
    {
      vaccine: 'Корь, краснуха, паротит',
      age: 'До 35 лет (при отсутствии иммунитета)',
      doses: 2,
      description: 'Если не болели и не вакцинированы в детстве. Особенно важно для женщин детородного возраста.',
      completed: true,
      isRecommended: false
    },
    {
      vaccine: 'Гепатит В',
      age: 'При отсутствии вакцинации',
      doses: 3,
      description: 'Рекомендуется всем взрослым, особенно медработникам и людям из групп риска.',
      completed: true,
      isRecommended: false
    },
    {
      vaccine: 'Гепатит А',
      age: 'По показаниям',
      doses: 2,
      description: 'Рекомендуется путешественникам и людям с заболеваниями печени.',
      completed: false,
      isRecommended: false
    },
    {
      vaccine: 'Пневмококковая инфекция',
      age: '65+ лет или по показаниям',
      doses: 1,
      description: 'Защита от пневмонии. Рекомендуется людям с хроническими заболеваниями.',
      completed: false,
      isRecommended: false
    },
    {
      vaccine: 'Опоясывающий лишай (герпес зостер)',
      age: '50+ лет',
      doses: 2,
      description: 'Профилактика опоясывающего лишая и постгерпетической невралгии.',
      completed: false,
      isRecommended: false
    },
    {
      vaccine: 'Клещевой энцефалит',
      age: 'По показаниям',
      doses: 3,
      description: 'Для жителей эндемичных регионов и любителей активного отдыха на природе.',
      completed: false,
      isRecommended: false
    },
    {
      vaccine: 'Менингококковая инфекция',
      age: 'По показаниям',
      doses: 1,
      description: 'Рекомендуется призывникам, студентам общежитий, путешественникам в Африку.',
      completed: false,
      isRecommended: false
    }
  ];

  const ageBasedVaccinations = [
    {
      ageGroup: '18-29 лет',
      vaccines: ['Грипп (ежегодно)', 'COVID-19', 'АДС-М (каждые 10 лет)', 'Корь, краснуха, паротит (если не привиты)'],
      isCurrentAge: true
    },
    {
      ageGroup: '30-39 лет',
      vaccines: ['Грипп (ежегодно)', 'COVID-19', 'АДС-М (в 39 лет)', 'Гепатит B (если не привиты)'],
      isCurrentAge: false
    },
    {
      ageGroup: '40-49 лет',
      vaccines: ['Грипп (ежегодно)', 'COVID-19', 'АДС-М (в 49 лет)'],
      isCurrentAge: false
    },
    {
      ageGroup: '50-64 лет',
      vaccines: ['Грипп (ежегодно)', 'COVID-19', 'АДС-М (каждые 10 лет)', 'Опоясывающий лишай (с 50 лет)', 'Пневмококковая (по показаниям)'],
      isCurrentAge: false
    },
    {
      ageGroup: '65+ лет',
      vaccines: ['Грипп (ежегодно)', 'COVID-19', 'АДС-М (каждые 10 лет)', 'Пневмококковая инфекция', 'Опоясывающий лишай'],
      isCurrentAge: false
    }
  ];

  const screeningByAge = [
    {
      category: 'Женское здоровье',
      icon: 'Heart',
      screenings: [
        { name: 'Маммография', age: '40+', frequency: 'Каждые 1-2 года', current: false },
        { name: 'Мазок на онкоцитологию (Пап-тест)', age: '21-65', frequency: 'Каждые 3 года', current: true },
        { name: 'Денситометрия (остеопороз)', age: '65+', frequency: 'По показаниям', current: false }
      ]
    },
    {
      category: 'Сердечно-сосудистая система',
      icon: 'HeartPulse',
      screenings: [
        { name: 'Измерение АД', age: '18+', frequency: 'При каждом визите', current: true },
        { name: 'Липидограмма (холестерин)', age: '20+', frequency: 'Каждые 5 лет', current: true },
        { name: 'ЭКГ', age: '40+', frequency: 'Ежегодно', current: false }
      ]
    },
    {
      category: 'Онкоскрининг',
      icon: 'ShieldAlert',
      screenings: [
        { name: 'Колоноскопия', age: '45+', frequency: 'Каждые 5-10 лет', current: false },
        { name: 'Анализ кала на скрытую кровь', age: '50+', frequency: 'Ежегодно', current: false },
        { name: 'Дерматоскопия (осмотр родинок)', age: 'Любой', frequency: 'Ежегодно', current: true }
      ]
    },
    {
      category: 'Эндокринная система',
      icon: 'Activity',
      screenings: [
        { name: 'Глюкоза крови натощак', age: '45+', frequency: 'Каждые 3 года', current: false },
        { name: 'HbA1c (гликированный гемоглобин)', age: 'По показаниям', frequency: 'Каждые 3-6 месяцев', current: true },
        { name: 'ТТГ (функция щитовидной железы)', age: '35+', frequency: 'Каждые 5 лет', current: false }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">График диспансеризации и вакцинации</h2>
        <p className="text-muted-foreground">
          Персональный календарь профилактических осмотров и прививок
        </p>
      </div>

      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Ваш возраст</p>
              <p className="text-3xl font-bold">{currentAge} лет</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-sm text-muted-foreground">Следующая диспансеризация</p>
              <p className="text-lg font-semibold text-primary">15 ноября 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="checkups" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="checkups" className="gap-2">
            <Icon name="ClipboardCheck" size={16} />
            Диспансеризация
          </TabsTrigger>
          <TabsTrigger value="vaccinations" className="gap-2">
            <Icon name="Syringe" size={16} />
            Вакцинация
          </TabsTrigger>
          <TabsTrigger value="screening" className="gap-2">
            <Icon name="FileSearch" size={16} />
            Скрининги
          </TabsTrigger>
        </TabsList>

        <TabsContent value="checkups" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Calendar" size={24} />
                Программа диспансеризации по возрастам
              </CardTitle>
              <CardDescription>
                Обязательные медицинские обследования в разные периоды жизни
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {checkupSchedule.map((checkup, idx) => (
                <Card key={idx} className={checkup.age.includes(currentAge.toString().split('-')[0]) ? 'border-primary' : ''}>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-semibold">{checkup.age}</h4>
                          {checkup.age.includes(currentAge.toString().split('-')[0]) && (
                            <Badge variant="default">Ваш возраст</Badge>
                          )}
                          {checkup.completed && (
                            <Badge variant="outline" className="gap-1">
                              <Icon name="CheckCircle2" size={12} />
                              Пройдена
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">Периодичность: {checkup.period}</p>
                        {checkup.nextDate && (
                          <p className="text-sm text-primary font-medium">Следующий осмотр: {new Date(checkup.nextDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm flex items-center gap-2">
                          <Icon name="TestTube" size={16} />
                          Обследования
                        </h5>
                        <ul className="space-y-1">
                          {checkup.examinations.map((exam, eIdx) => (
                            <li key={eIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <Icon name="Check" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                              <span>{exam}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-medium text-sm flex items-center gap-2">
                          <Icon name="UserCircle" size={16} />
                          Консультации специалистов
                        </h5>
                        <ul className="space-y-1">
                          {checkup.specialists.map((specialist, sIdx) => (
                            <li key={sIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <Icon name="Check" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                              <span>{specialist}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {checkup.nextDate && (
                      <Button className="w-full" variant={checkup.completed ? "outline" : "default"}>
                        <Icon name="CalendarPlus" size={16} />
                        {checkup.completed ? 'Запланировать следующую' : 'Записаться на диспансеризацию'}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vaccinations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Syringe" size={24} />
                График вакцинации по возрастам
              </CardTitle>
              <CardDescription>
                Рекомендованные прививки для взрослых
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {ageBasedVaccinations.map((group, idx) => (
                <Card key={idx} className={group.isCurrentAge ? 'border-primary bg-primary/5' : ''}>
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{group.ageGroup}</h4>
                      {group.isCurrentAge && <Badge>Ваш возраст</Badge>}
                    </div>
                    <ul className="space-y-2">
                      {group.vaccines.map((vaccine, vIdx) => (
                        <li key={vIdx} className="text-sm flex items-start gap-2">
                          <Icon name="Syringe" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                          <span>{vaccine}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Calendar" size={24} />
                Индивидуальный календарь вакцинации
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Icon name="AlertCircle" size={18} className="text-primary" />
                  Обязательные и рекомендуемые
                </h4>
                {vaccinationSchedule.filter(v => v.isRecommended).map((vaccine, idx) => (
                  <Card key={idx} className={vaccine.completed ? 'bg-secondary/30' : 'border-primary'}>
                    <CardContent className="pt-4 space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h5 className="font-semibold">{vaccine.vaccine}</h5>
                            {vaccine.completed ? (
                              <Badge variant="outline" className="gap-1">
                                <Icon name="CheckCircle2" size={12} />
                                Выполнена
                              </Badge>
                            ) : (
                              <Badge variant="destructive">Требуется</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{vaccine.age} • {vaccine.doses} доз(а/ы)</p>
                          <p className="text-sm">{vaccine.description}</p>
                          {vaccine.nextDate && (
                            <p className="text-sm text-primary font-medium">
                              Следующая доза: {new Date(vaccine.nextDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                          )}
                        </div>
                        <Button size="sm" variant={vaccine.completed ? "outline" : "default"}>
                          <Icon name="Calendar" size={14} />
                          Записаться
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Icon name="Info" size={18} className="text-muted-foreground" />
                  Дополнительные (по показаниям)
                </h4>
                {vaccinationSchedule.filter(v => !v.isRecommended).map((vaccine, idx) => (
                  <Card key={idx} className="bg-secondary/20">
                    <CardContent className="pt-4 space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          <h5 className="font-semibold">{vaccine.vaccine}</h5>
                          <p className="text-sm text-muted-foreground">{vaccine.age} • {vaccine.doses} доз(а/ы)</p>
                          <p className="text-sm">{vaccine.description}</p>
                        </div>
                        {vaccine.completed && (
                          <Badge variant="outline" className="gap-1">
                            <Icon name="CheckCircle2" size={12} />
                            Выполнена
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="screening" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="FileSearch" size={24} />
                Специализированные скрининги
              </CardTitle>
              <CardDescription>
                Профилактические обследования по направлениям
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {screeningByAge.map((category, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6 space-y-4">
                    <h4 className="font-semibold text-lg flex items-center gap-2">
                      <Icon name={category.icon as any} size={20} className="text-primary" />
                      {category.category}
                    </h4>
                    <div className="space-y-3">
                      {category.screenings.map((screening, sIdx) => (
                        <div key={sIdx} className={`flex items-start justify-between gap-4 p-3 rounded-lg ${screening.current ? 'bg-primary/10' : 'bg-secondary/20'}`}>
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <h5 className="font-medium">{screening.name}</h5>
                              {screening.current && <Badge variant="default">Актуально</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Возраст: {screening.age} • {screening.frequency}
                            </p>
                          </div>
                          {screening.current && (
                            <Button size="sm" variant="outline">
                              <Icon name="CalendarPlus" size={14} />
                              Записаться
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 text-sm">
            <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <p className="font-medium">Важная информация</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Диспансеризация проводится бесплатно по полису ОМС</li>
                <li>• Вакцинация взрослых по календарю прививок - бесплатна в поликлинике</li>
                <li>• График может корректироваться врачом с учетом состояния здоровья</li>
                <li>• Некоторые прививки требуют предварительной консультации</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthSchedule;
