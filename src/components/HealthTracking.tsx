import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Measurement {
  id: string;
  type: string;
  value: string;
  unit: string;
  timestamp: string;
  status: 'normal' | 'warning' | 'critical';
}

interface VitalSign {
  name: string;
  value: string;
  unit: string;
  icon: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  history: number[];
}

const HealthTracking = () => {
  const [isAddingMeasurement, setIsAddingMeasurement] = useState(false);

  const vitalSigns: VitalSign[] = [
    {
      name: 'Пульс',
      value: '72',
      unit: 'уд/мин',
      icon: 'HeartPulse',
      status: 'normal',
      trend: 'stable',
      history: [68, 70, 72, 71, 72, 73, 72],
    },
    {
      name: 'Давление',
      value: '120/80',
      unit: 'мм рт.ст.',
      icon: 'Activity',
      status: 'normal',
      trend: 'down',
      history: [125, 122, 121, 120, 120, 119, 120],
    },
    {
      name: 'Температура',
      value: '36.6',
      unit: '°C',
      icon: 'Thermometer',
      status: 'normal',
      trend: 'stable',
      history: [36.5, 36.6, 36.7, 36.6, 36.6, 36.5, 36.6],
    },
    {
      name: 'Сахар',
      value: '5.2',
      unit: 'ммоль/л',
      icon: 'Droplet',
      status: 'normal',
      trend: 'stable',
      history: [5.1, 5.3, 5.2, 5.4, 5.2, 5.1, 5.2],
    },
    {
      name: 'Вес',
      value: '82',
      unit: 'кг',
      icon: 'Scale',
      status: 'normal',
      trend: 'down',
      history: [84, 83.5, 83, 82.5, 82.3, 82.1, 82],
    },
    {
      name: 'SpO₂',
      value: '98',
      unit: '%',
      icon: 'Wind',
      status: 'normal',
      trend: 'stable',
      history: [97, 98, 98, 97, 98, 98, 98],
    },
  ];

  const recentMeasurements: Measurement[] = [
    {
      id: '1',
      type: 'Давление',
      value: '120/80',
      unit: 'мм рт.ст.',
      timestamp: 'Сегодня, 09:30',
      status: 'normal',
    },
    {
      id: '2',
      type: 'Пульс',
      value: '72',
      unit: 'уд/мин',
      timestamp: 'Сегодня, 09:30',
      status: 'normal',
    },
    {
      id: '3',
      type: 'Сахар',
      value: '5.2',
      unit: 'ммоль/л',
      timestamp: 'Вчера, 22:15',
      status: 'normal',
    },
    {
      id: '4',
      type: 'Вес',
      value: '82',
      unit: 'кг',
      timestamp: 'Вчера, 08:00',
      status: 'normal',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-secondary';
      case 'warning': return 'text-[#F59E0B]';
      case 'critical': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal': return <Badge className="bg-secondary text-white border-0">Норма</Badge>;
      case 'warning': return <Badge className="bg-[#F59E0B] text-white border-0">Внимание</Badge>;
      case 'critical': return <Badge variant="destructive">Критично</Badge>;
      default: return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <Icon name="TrendingUp" size={16} className="text-[#F59E0B]" />;
      case 'down': return <Icon name="TrendingDown" size={16} className="text-secondary" />;
      case 'stable': return <Icon name="Minus" size={16} className="text-muted-foreground" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Activity" className="text-primary" />
                Текущие показатели
              </CardTitle>
              <CardDescription>Последние измерения от 21 ноября 2024, 09:30</CardDescription>
            </div>
            <Button onClick={() => setIsAddingMeasurement(true)}>
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить измерение
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vitalSigns.map((sign, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border bg-gradient-to-br from-card to-muted/20 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    sign.status === 'normal' ? 'bg-secondary/20' : 
                    sign.status === 'warning' ? 'bg-[#F59E0B]/20' : 'bg-destructive/20'
                  }`}>
                    <Icon 
                      name={sign.icon as any} 
                      className={getStatusColor(sign.status)}
                      size={20}
                    />
                  </div>
                  {getTrendIcon(sign.trend)}
                </div>
                <h4 className="text-sm text-muted-foreground mb-1">{sign.name}</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{sign.value}</span>
                  <span className="text-sm text-muted-foreground">{sign.unit}</span>
                </div>
                <div className="mt-3 h-12 flex items-end gap-1">
                  {sign.history.map((val, i) => {
                    const maxVal = Math.max(...sign.history);
                    const minVal = Math.min(...sign.history);
                    const range = maxVal - minVal || 1;
                    const height = ((val - minVal) / range) * 100;
                    return (
                      <div key={i} className="flex-1 flex flex-col justify-end">
                        <div
                          className={`w-full rounded-t transition-all ${
                            i === sign.history.length - 1
                              ? 'bg-primary'
                              : 'bg-primary/30 hover:bg-primary/50'
                          }`}
                          style={{ height: `${Math.max(height, 10)}%` }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="history" className="animate-fade-in">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="history">
            <Icon name="History" size={16} className="mr-2" />
            История
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <Icon name="LineChart" size={16} className="mr-2" />
            Аналитика
          </TabsTrigger>
          <TabsTrigger value="goals">
            <Icon name="Target" size={16} className="mr-2" />
            Цели
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Последние измерения</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentMeasurements.map((measurement) => (
                <div
                  key={measurement.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    <div>
                      <p className="font-medium">{measurement.type}</p>
                      <p className="text-sm text-muted-foreground">{measurement.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">
                      {measurement.value} <span className="text-sm text-muted-foreground">{measurement.unit}</span>
                    </span>
                    {getStatusBadge(measurement.status)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Недельная статистика</CardTitle>
              <CardDescription>Анализ показателей за последние 7 дней</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="CheckCircle2" className="text-secondary" size={20} />
                    <h4 className="font-semibold">Улучшения</h4>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Icon name="ArrowDown" size={14} className="text-secondary" />
                      <span>Давление снизилось на 5 единиц</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="ArrowDown" size={14} className="text-secondary" />
                      <span>Вес снизился на 2 кг</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={14} className="text-secondary" />
                      <span>Пульс стабилен в норме</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="Target" className="text-primary" size={20} />
                    <h4 className="font-semibold">Рекомендации</h4>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Icon name="Circle" size={8} className="text-primary" />
                      <span>Продолжайте контроль веса</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Circle" size={8} className="text-primary" />
                      <span>Измеряйте давление утром</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Circle" size={8} className="text-primary" />
                      <span>Отличная динамика!</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Brain" className="text-accent" size={18} />
                  AI Прогноз
                </h4>
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-sm">
                    На основе текущей динамики, через 2 недели ваш вес может снизиться до целевых 80 кг. 
                    Продолжайте придерживаться текущего режима питания и физической активности.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Мои цели</span>
                <Button size="sm" variant="outline">
                  <Icon name="Plus" size={14} className="mr-1" />
                  Добавить цель
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Снизить вес до 80 кг</h4>
                  <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                    В процессе
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Целевая дата: 15 декабря 2024</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Прогресс</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                  <p className="text-xs text-muted-foreground">Осталось 2 кг до цели</p>
                </div>
              </div>

              <div className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Стабилизировать давление</h4>
                  <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                    Достигнуто
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Достигнуто: 10 ноября 2024</p>
                <div className="flex items-center gap-2 text-sm text-secondary">
                  <Icon name="CheckCircle2" size={16} />
                  <span>Давление в норме 14 дней подряд</span>
                </div>
              </div>

              <div className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Сахар в пределах 5.0-5.5</h4>
                  <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                    В процессе
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Целевая дата: 30 ноября 2024</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Прогресс</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-muted-foreground">Отличные результаты!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isAddingMeasurement && (
        <Card className="animate-scale-in border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Новое измерение</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsAddingMeasurement(false)}>
                <Icon name="X" size={18} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="measurement-type">Тип измерения</Label>
                <select
                  id="measurement-type"
                  className="w-full px-3 py-2 rounded-lg border bg-background"
                >
                  <option>Давление</option>
                  <option>Пульс</option>
                  <option>Температура</option>
                  <option>Сахар</option>
                  <option>Вес</option>
                  <option>SpO₂</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="measurement-value">Значение</Label>
                <Input id="measurement-value" placeholder="Введите значение" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="measurement-notes">Заметки (необязательно)</Label>
              <Input id="measurement-notes" placeholder="Дополнительная информация" />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">
                <Icon name="Save" size={16} className="mr-2" />
                Сохранить
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setIsAddingMeasurement(false)}>
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HealthTracking;
