import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import HumanBodyModel from '@/components/HumanBodyModel';
import HealthTracking from '@/components/HealthTracking';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const medications = [
    { name: 'Аспирин', dosage: '100 мг', time: '09:00', taken: true },
    { name: 'Метформин', dosage: '500 мг', time: '14:00', taken: false },
    { name: 'Лизиноприл', dosage: '10 мг', time: '21:00', taken: false },
  ];

  const symptoms = [
    { date: '20 ноя', mood: 85, energy: 70, sleep: 90 },
    { date: '19 ноя', mood: 75, energy: 65, sleep: 85 },
    { date: '18 ноя', mood: 90, energy: 80, sleep: 95 },
    { date: '17 ноя', mood: 70, energy: 60, sleep: 80 },
  ];

  const tests = [
    { name: 'Общий анализ крови', date: '15 ноя 2024', status: 'Норма', icon: 'Activity' },
    { name: 'Биохимический анализ', date: '10 ноя 2024', status: 'Ожидание', icon: 'FlaskConical' },
    { name: 'ЭКГ', date: '5 ноя 2024', status: 'Норма', icon: 'HeartPulse' },
  ];

  const aiRecommendations = [
    { text: 'Увеличьте потребление воды до 2 литров в день', priority: 'high' },
    { text: 'Рекомендуется консультация кардиолога', priority: 'medium' },
    { text: 'Отличная динамика показателей сна', priority: 'low' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Icon name="HeartPulse" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Мой Медицинский Близнец</h1>
                <p className="text-sm text-muted-foreground">Ваше здоровье под контролем AI</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-1.5">
                <Icon name="Shield" size={14} />
                Данные зашифрованы
              </Badge>
              <Avatar>
                <AvatarFallback className="bg-primary text-white">АИ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
            <TabsTrigger value="dashboard" className="gap-2">
              <Icon name="LayoutDashboard" size={16} />
              <span className="hidden sm:inline">Панель</span>
            </TabsTrigger>
            <TabsTrigger value="tracking" className="gap-2">
              <Icon name="Activity" size={16} />
              <span className="hidden sm:inline">Отслеживание</span>
            </TabsTrigger>
            <TabsTrigger value="medications" className="gap-2">
              <Icon name="Pill" size={16} />
              <span className="hidden sm:inline">Лекарства</span>
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="gap-2">
              <Icon name="User" size={16} />
              <span className="hidden sm:inline">Симптомы</span>
            </TabsTrigger>
            <TabsTrigger value="tests" className="gap-2">
              <Icon name="FileText" size={16} />
              <span className="hidden sm:inline">Анализы</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <Icon name="UserCircle" size={16} />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon name="Pill" className="text-primary" size={18} />
                    Сегодняшние лекарства
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2/3</div>
                  <Progress value={66} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">Одна таблетка в 21:00</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-secondary" size={18} />
                    Общее самочувствие
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">82%</div>
                  <div className="flex items-center gap-1 mt-2 text-secondary">
                    <Icon name="ArrowUp" size={16} />
                    <span className="text-sm font-medium">+5% за неделю</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon name="Brain" className="text-accent" size={18} />
                    AI Ассистент
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse-soft" />
                    <span className="text-sm">Активен и готов помочь</span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    Задать вопрос
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Sparkles" className="text-primary" />
                  Персональные рекомендации от AI
                </CardTitle>
                <CardDescription>
                  Основано на анализе ваших показателей за последние 30 дней
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiRecommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                    <Icon 
                      name={rec.priority === 'high' ? 'AlertCircle' : rec.priority === 'medium' ? 'Info' : 'CheckCircle'} 
                      className={rec.priority === 'high' ? 'text-destructive' : rec.priority === 'medium' ? 'text-primary' : 'text-secondary'}
                      size={20}
                    />
                    <div className="flex-1">
                      <p className="text-sm">{rec.text}</p>
                      {rec.priority === 'high' && (
                        <Badge variant="destructive" className="mt-2 text-xs">Важно</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6 animate-fade-in">
            <HealthTracking />
          </TabsContent>

          <TabsContent value="medications" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Icon name="Pill" className="text-primary" />
                    Расписание приёма лекарств
                  </span>
                  <Button size="sm">
                    <Icon name="Plus" size={16} className="mr-1" />
                    Добавить
                  </Button>
                </CardTitle>
                <CardDescription>Сегодня, 21 ноября 2024</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {medications.map((med, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-lg border bg-card">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${med.taken ? 'bg-secondary/20' : 'bg-primary/20'}`}>
                      <Icon name="Pill" className={med.taken ? 'text-secondary' : 'text-primary'} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{med.name}</h4>
                      <p className="text-sm text-muted-foreground">{med.dosage} • {med.time}</p>
                    </div>
                    {med.taken ? (
                      <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                        <Icon name="Check" size={14} className="mr-1" />
                        Принято
                      </Badge>
                    ) : (
                      <Button variant="outline" size="sm">
                        Отметить
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Bell" className="text-accent" />
                  Напоминания
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Icon name="Smartphone" className="text-primary" />
                    <div>
                      <p className="font-medium">Уведомления включены</p>
                      <p className="text-sm text-muted-foreground">Напомним о приёме лекарств</p>
                    </div>
                  </div>
                  <Icon name="ChevronRight" className="text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="symptoms" className="space-y-6 animate-fade-in">
            <HumanBodyModel />
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Activity" className="text-primary" />
                  Дневник самочувствия
                </CardTitle>
                <CardDescription>Отслеживайте изменения своего состояния</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {symptoms.map((day, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{day.date}</span>
                      <Button variant="ghost" size="sm">
                        <Icon name="Edit2" size={14} />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Icon name="Smile" size={16} className="text-primary" />
                          Настроение
                        </span>
                        <span className="font-medium">{day.mood}%</span>
                      </div>
                      <Progress value={day.mood} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Icon name="Zap" size={16} className="text-secondary" />
                          Энергия
                        </span>
                        <span className="font-medium">{day.energy}%</span>
                      </div>
                      <Progress value={day.energy} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Icon name="Moon" size={16} className="text-accent" />
                          Качество сна
                        </span>
                        <span className="font-medium">{day.sleep}%</span>
                      </div>
                      <Progress value={day.sleep} className="h-2" />
                    </div>

                    {idx < symptoms.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}

                <Button className="w-full mt-4">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить запись за сегодня
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Icon name="FileText" className="text-primary" />
                    Медицинские анализы
                  </span>
                  <Button size="sm">
                    <Icon name="Upload" size={16} className="mr-1" />
                    Загрузить
                  </Button>
                </CardTitle>
                <CardDescription>История результатов исследований</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tests.map((test, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name={test.icon as any} className="text-primary" size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{test.name}</h4>
                      <p className="text-sm text-muted-foreground">{test.date}</p>
                    </div>
                    <Badge variant={test.status === 'Норма' ? 'outline' : 'secondary'} className={test.status === 'Норма' ? 'bg-secondary/10 text-secondary border-secondary/20' : ''}>
                      {test.status}
                    </Badge>
                    <Icon name="ChevronRight" className="text-muted-foreground" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="TrendingUp" className="text-secondary" />
                  Динамика показателей
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-end justify-between gap-2">
                  {[65, 70, 85, 90, 80, 95, 88].map((height, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-primary/20 hover:bg-primary/30 rounded-t-lg transition-all cursor-pointer"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs text-muted-foreground">{idx + 1}</span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">Последние 7 анализов</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" className="text-primary" />
                  Профиль пациента
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-primary text-white text-2xl">АИ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">Александр Иванов</h3>
                    <p className="text-muted-foreground">Пациент с 2024 года</p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Возраст</p>
                    <p className="font-medium">45 лет</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Группа крови</p>
                    <p className="font-medium">A+ (II положительная)</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Рост</p>
                    <p className="font-medium">178 см</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Вес</p>
                    <p className="font-medium">82 кг</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="AlertTriangle" className="text-destructive" size={18} />
                    Аллергии
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="destructive">Пенициллин</Badge>
                    <Badge variant="destructive">Пыльца березы</Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="History" className="text-primary" size={18} />
                    Хронические заболевания
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Circle" size={8} className="text-primary" />
                      <span>Гипертония (с 2018 года)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Circle" size={8} className="text-primary" />
                      <span>Диабет 2 типа (с 2020 года)</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-3">
                    <Icon name="Shield" className="text-secondary" size={24} />
                    <div>
                      <p className="font-medium">Защита данных</p>
                      <p className="text-sm text-muted-foreground">End-to-end шифрование активно</p>
                    </div>
                  </div>
                  <Icon name="Check" className="text-secondary" size={20} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;