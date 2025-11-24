import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface RealTimeMetrics {
  heartRate: number;
  steps: number;
  calories: number;
  distance: number;
  activeMinutes: number;
  stress: number;
  oxygen: number;
  temperature: number;
}

interface HourlyData {
  hour: string;
  heartRate: number;
  steps: number;
  calories: number;
  stress: number;
}

const FitnessTracker = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [lastSync, setLastSync] = useState<Date>(new Date());
  const [realTimeMetrics, setRealTimeMetrics] = useState<RealTimeMetrics>({
    heartRate: 72,
    steps: 8234,
    calories: 1845,
    distance: 5.8,
    activeMinutes: 143,
    stress: 35,
    oxygen: 98,
    temperature: 36.6
  });

  const hourlyData: HourlyData[] = [
    { hour: '00:00', heartRate: 58, steps: 0, calories: 60, stress: 15 },
    { hour: '01:00', heartRate: 56, steps: 0, calories: 65, stress: 12 },
    { hour: '02:00', heartRate: 55, steps: 0, calories: 62, stress: 10 },
    { hour: '03:00', heartRate: 54, steps: 0, calories: 61, stress: 10 },
    { hour: '04:00', heartRate: 55, steps: 0, calories: 63, stress: 12 },
    { hour: '05:00', heartRate: 57, steps: 0, calories: 68, stress: 15 },
    { hour: '06:00', heartRate: 62, steps: 125, calories: 85, stress: 25 },
    { hour: '07:00', heartRate: 68, steps: 543, calories: 142, stress: 32 },
    { hour: '08:00', heartRate: 75, steps: 892, calories: 198, stress: 38 },
    { hour: '09:00', heartRate: 78, steps: 1234, calories: 256, stress: 42 },
    { hour: '10:00', heartRate: 72, steps: 1456, calories: 287, stress: 35 },
    { hour: '11:00', heartRate: 70, steps: 1698, calories: 315, stress: 30 },
    { hour: '12:00', heartRate: 74, steps: 2123, calories: 389, stress: 28 },
    { hour: '13:00', heartRate: 76, steps: 2567, calories: 445, stress: 32 },
    { hour: '14:00', heartRate: 82, steps: 3234, calories: 567, stress: 48 },
    { hour: '15:00', heartRate: 88, steps: 4123, calories: 698, stress: 55 },
    { hour: '16:00', heartRate: 85, steps: 5234, calories: 856, stress: 50 },
    { hour: '17:00', heartRate: 90, steps: 6456, calories: 1025, stress: 58 },
    { hour: '18:00', heartRate: 78, steps: 7234, calories: 1198, stress: 42 },
    { hour: '19:00', heartRate: 72, steps: 7856, calories: 1345, stress: 35 },
    { hour: '20:00', heartRate: 70, steps: 8123, calories: 1456, stress: 32 },
    { hour: '21:00', heartRate: 68, steps: 8234, calories: 1567, stress: 30 },
    { hour: '22:00', heartRate: 65, steps: 8234, calories: 1698, stress: 25 },
    { hour: '23:00', heartRate: 62, steps: 8234, calories: 1845, stress: 22 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        ...prev,
        heartRate: prev.heartRate + Math.floor(Math.random() * 6) - 3,
        steps: prev.steps + Math.floor(Math.random() * 10),
        calories: prev.calories + Math.floor(Math.random() * 5),
        stress: Math.max(0, Math.min(100, prev.stress + Math.floor(Math.random() * 10) - 5))
      }));
      setLastSync(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getHeartRateStatus = (hr: number) => {
    if (hr < 60) return { status: 'Низкий', color: 'text-blue-500', variant: 'secondary' as const };
    if (hr > 100) return { status: 'Высокий', color: 'text-red-500', variant: 'destructive' as const };
    return { status: 'Норма', color: 'text-green-500', variant: 'default' as const };
  };

  const getStressLevel = (stress: number) => {
    if (stress < 30) return { level: 'Низкий', color: 'text-green-500', variant: 'default' as const };
    if (stress < 60) return { level: 'Средний', color: 'text-yellow-500', variant: 'secondary' as const };
    return { level: 'Высокий', color: 'text-red-500', variant: 'destructive' as const };
  };

  const hrStatus = getHeartRateStatus(realTimeMetrics.heartRate);
  const stressStatus = getStressLevel(realTimeMetrics.stress);

  const currentHour = new Date().getHours();
  const todayData = hourlyData.slice(0, currentHour + 1);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Фитнес-часы</h2>
        <p className="text-muted-foreground">
          Мониторинг показателей здоровья в реальном времени
        </p>
      </div>

      <Card className={`${isConnected ? 'border-green-500/50 bg-green-500/5' : 'border-destructive/50 bg-destructive/5'}`}>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-destructive'}`} />
              <div>
                <p className="font-medium">
                  {isConnected ? 'Устройство подключено' : 'Устройство не подключено'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Последняя синхронизация: {lastSync.toLocaleTimeString('ru-RU')}
                </p>
              </div>
            </div>
            <Button 
              variant={isConnected ? 'outline' : 'default'} 
              size="sm"
              onClick={() => setIsConnected(!isConnected)}
            >
              <Icon name={isConnected ? 'Unplug' : 'Plug'} size={16} />
              {isConnected ? 'Отключить' : 'Подключить'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Activity" size={24} />
            Показатели в реальном времени
          </CardTitle>
          <CardDescription>
            Автоматическое обновление каждые 5 секунд
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-red-500/10 to-background">
              <CardContent className="pt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <Icon name="Heart" className="text-red-500" size={20} />
                  <Badge variant={hrStatus.variant}>{hrStatus.status}</Badge>
                </div>
                <div className="text-3xl font-bold">{realTimeMetrics.heartRate}</div>
                <p className="text-sm text-muted-foreground">уд/мин</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-background">
              <CardContent className="pt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <Icon name="Footprints" className="text-blue-500" size={20} />
                  <Icon name="TrendingUp" className="text-green-500" size={16} />
                </div>
                <div className="text-3xl font-bold">{realTimeMetrics.steps.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">шагов</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-background">
              <CardContent className="pt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <Icon name="Flame" className="text-orange-500" size={20} />
                  <span className="text-xs text-muted-foreground">75%</span>
                </div>
                <div className="text-3xl font-bold">{realTimeMetrics.calories}</div>
                <p className="text-sm text-muted-foreground">ккал</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-background">
              <CardContent className="pt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <Icon name="Brain" className="text-purple-500" size={20} />
                  <Badge variant={stressStatus.variant}>{stressStatus.level}</Badge>
                </div>
                <div className="text-3xl font-bold">{realTimeMetrics.stress}</div>
                <p className="text-sm text-muted-foreground">стресс</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-2">
                <Icon name="MapPin" className="text-green-500" size={20} />
                <div className="text-2xl font-bold">{realTimeMetrics.distance}</div>
                <p className="text-sm text-muted-foreground">км пройдено</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-2">
                <Icon name="Timer" className="text-cyan-500" size={20} />
                <div className="text-2xl font-bold">{realTimeMetrics.activeMinutes}</div>
                <p className="text-sm text-muted-foreground">мин активности</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-2">
                <Icon name="Wind" className="text-sky-500" size={20} />
                <div className="text-2xl font-bold">{realTimeMetrics.oxygen}%</div>
                <p className="text-sm text-muted-foreground">SpO₂</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-2">
                <Icon name="Thermometer" className="text-amber-500" size={20} />
                <div className="text-2xl font-bold">{realTimeMetrics.temperature}°</div>
                <p className="text-sm text-muted-foreground">температура</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Clock" size={24} />
            Статистика по часам (сегодня)
          </CardTitle>
          <CardDescription>
            Детальная информация с начала дня
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Пульс по часам</h4>
                <Badge variant="outline">Средний: 70 уд/мин</Badge>
              </div>
              <div className="grid grid-cols-12 lg:grid-cols-24 gap-1">
                {todayData.map((data, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div 
                      className="w-full bg-red-500/20 rounded-t hover:bg-red-500/40 transition-colors cursor-pointer"
                      style={{ height: `${(data.heartRate / 120) * 60}px` }}
                      title={`${data.hour}: ${data.heartRate} уд/мин`}
                    />
                    {idx % 3 === 0 && (
                      <span className="text-xs text-muted-foreground">{data.hour.split(':')[0]}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Шаги по часам</h4>
                <Badge variant="outline">Цель: 10,000</Badge>
              </div>
              <div className="grid grid-cols-12 lg:grid-cols-24 gap-1">
                {todayData.map((data, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div 
                      className="w-full bg-blue-500/20 rounded-t hover:bg-blue-500/40 transition-colors cursor-pointer"
                      style={{ height: `${(data.steps / 500) * 10}px` }}
                      title={`${data.hour}: ${data.steps} шагов`}
                    />
                    {idx % 3 === 0 && (
                      <span className="text-xs text-muted-foreground">{data.hour.split(':')[0]}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Уровень стресса по часам</h4>
                <Badge variant="outline">Средний: {Math.round(todayData.reduce((sum, d) => sum + d.stress, 0) / todayData.length)}</Badge>
              </div>
              <div className="grid grid-cols-12 lg:grid-cols-24 gap-1">
                {todayData.map((data, idx) => {
                  const color = data.stress < 30 ? 'bg-green-500/20 hover:bg-green-500/40' : 
                                data.stress < 60 ? 'bg-yellow-500/20 hover:bg-yellow-500/40' : 
                                'bg-red-500/20 hover:bg-red-500/40';
                  return (
                    <div key={idx} className="flex flex-col items-center gap-1">
                      <div 
                        className={`w-full rounded-t transition-colors cursor-pointer ${color}`}
                        style={{ height: `${(data.stress / 100) * 60}px` }}
                        title={`${data.hour}: стресс ${data.stress}`}
                      />
                      {idx % 3 === 0 && (
                        <span className="text-xs text-muted-foreground">{data.hour.split(':')[0]}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Target" size={24} />
            Достижение целей
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Шаги: {realTimeMetrics.steps.toLocaleString()} / 10,000</span>
              <span className="font-medium">{Math.round((realTimeMetrics.steps / 10000) * 100)}%</span>
            </div>
            <Progress value={(realTimeMetrics.steps / 10000) * 100} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Калории: {realTimeMetrics.calories} / 2,500</span>
              <span className="font-medium">{Math.round((realTimeMetrics.calories / 2500) * 100)}%</span>
            </div>
            <Progress value={(realTimeMetrics.calories / 2500) * 100} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Активность: {realTimeMetrics.activeMinutes} / 150 мин</span>
              <span className="font-medium">{Math.round((realTimeMetrics.activeMinutes / 150) * 100)}%</span>
            </div>
            <Progress value={(realTimeMetrics.activeMinutes / 150) * 100} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Расстояние: {realTimeMetrics.distance} / 8 км</span>
              <span className="font-medium">{Math.round((realTimeMetrics.distance / 8) * 100)}%</span>
            </div>
            <Progress value={(realTimeMetrics.distance / 8) * 100} />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 text-sm">
            <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <p className="font-medium">О интеграции с фитнес-часами</p>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Поддерживаются устройства: Apple Watch, Samsung Galaxy Watch, Garmin, Fitbit, Xiaomi Mi Band</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Данные синхронизируются автоматически каждые 5 секунд через Bluetooth или Wi-Fi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Все показатели анализируются AI для выявления аномалий и составления рекомендаций</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>При критических отклонениях (очень высокий/низкий пульс) система отправит уведомление</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FitnessTracker;
