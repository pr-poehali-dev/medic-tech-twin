import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface DiaryEntry {
  id: string;
  date: string;
  time: string;
  temperature: string;
  systolic: string;
  diastolic: string;
  pulse: string;
}

const HealthDiary = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: '1',
      date: '2024-11-24',
      time: '08:00',
      temperature: '36.6',
      systolic: '120',
      diastolic: '80',
      pulse: '72'
    },
    {
      id: '2',
      date: '2024-11-23',
      time: '20:00',
      temperature: '36.8',
      systolic: '125',
      diastolic: '82',
      pulse: '75'
    }
  ]);

  const [newEntry, setNewEntry] = useState({
    temperature: '',
    systolic: '',
    diastolic: '',
    pulse: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEntry.temperature && !newEntry.systolic && !newEntry.pulse) {
      return;
    }

    const now = new Date();
    const entry: DiaryEntry = {
      id: Date.now().toString(),
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().slice(0, 5),
      temperature: newEntry.temperature,
      systolic: newEntry.systolic,
      diastolic: newEntry.diastolic,
      pulse: newEntry.pulse
    };

    setEntries([entry, ...entries]);
    setNewEntry({ temperature: '', systolic: '', diastolic: '', pulse: '' });
  };

  const getTemperatureStatus = (temp: string) => {
    const t = parseFloat(temp);
    if (!t) return null;
    if (t < 36) return { label: 'Низкая', variant: 'secondary' as const };
    if (t > 37.2) return { label: 'Высокая', variant: 'destructive' as const };
    return { label: 'Норма', variant: 'default' as const };
  };

  const getPressureStatus = (sys: string, dia: string) => {
    const s = parseInt(sys);
    const d = parseInt(dia);
    if (!s || !d) return null;
    if (s > 140 || d > 90) return { label: 'Высокое', variant: 'destructive' as const };
    if (s < 90 || d < 60) return { label: 'Низкое', variant: 'secondary' as const };
    return { label: 'Норма', variant: 'default' as const };
  };

  const getPulseStatus = (pulse: string) => {
    const p = parseInt(pulse);
    if (!p) return null;
    if (p > 100) return { label: 'Высокий', variant: 'destructive' as const };
    if (p < 60) return { label: 'Низкий', variant: 'secondary' as const };
    return { label: 'Норма', variant: 'default' as const };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="ClipboardPlus" size={24} />
            Добавить запись
          </CardTitle>
          <CardDescription>
            Запишите текущие показатели здоровья
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="temperature" className="flex items-center gap-2">
                  <Icon name="Thermometer" size={16} />
                  Температура тела (°C)
                </Label>
                <Input
                  id="temperature"
                  type="number"
                  step="0.1"
                  min="34"
                  max="42"
                  placeholder="36.6"
                  value={newEntry.temperature}
                  onChange={(e) => setNewEntry({ ...newEntry, temperature: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pulse" className="flex items-center gap-2">
                  <Icon name="Heart" size={16} />
                  Пульс (уд/мин)
                </Label>
                <Input
                  id="pulse"
                  type="number"
                  min="40"
                  max="200"
                  placeholder="72"
                  value={newEntry.pulse}
                  onChange={(e) => setNewEntry({ ...newEntry, pulse: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Icon name="Activity" size={16} />
                  Давление (мм рт. ст.)
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min="60"
                    max="250"
                    placeholder="120"
                    value={newEntry.systolic}
                    onChange={(e) => setNewEntry({ ...newEntry, systolic: e.target.value })}
                  />
                  <span className="flex items-center text-muted-foreground">/</span>
                  <Input
                    type="number"
                    min="40"
                    max="150"
                    placeholder="80"
                    value={newEntry.diastolic}
                    onChange={(e) => setNewEntry({ ...newEntry, diastolic: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full md:w-auto">
              <Icon name="Plus" size={16} />
              Сохранить запись
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="BookOpen" size={24} />
            История записей
          </CardTitle>
          <CardDescription>
            Все ваши записи за последнее время
          </CardDescription>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="FileText" size={48} className="mx-auto mb-2 opacity-20" />
              <p>Записей пока нет</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <div key={entry.id}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg p-2 min-w-[60px]">
                        <span className="text-xs text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                        </span>
                        <span className="text-sm font-medium">{entry.time}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        {entry.temperature && (
                          <div className="flex items-center gap-2">
                            <Icon name="Thermometer" size={16} className="text-muted-foreground" />
                            <span className="font-medium">{entry.temperature}°C</span>
                            {getTemperatureStatus(entry.temperature) && (
                              <Badge variant={getTemperatureStatus(entry.temperature)!.variant}>
                                {getTemperatureStatus(entry.temperature)!.label}
                              </Badge>
                            )}
                          </div>
                        )}

                        {entry.systolic && entry.diastolic && (
                          <div className="flex items-center gap-2">
                            <Icon name="Activity" size={16} className="text-muted-foreground" />
                            <span className="font-medium">{entry.systolic}/{entry.diastolic}</span>
                            {getPressureStatus(entry.systolic, entry.diastolic) && (
                              <Badge variant={getPressureStatus(entry.systolic, entry.diastolic)!.variant}>
                                {getPressureStatus(entry.systolic, entry.diastolic)!.label}
                              </Badge>
                            )}
                          </div>
                        )}

                        {entry.pulse && (
                          <div className="flex items-center gap-2">
                            <Icon name="Heart" size={16} className="text-muted-foreground" />
                            <span className="font-medium">{entry.pulse} уд/мин</span>
                            {getPulseStatus(entry.pulse) && (
                              <Badge variant={getPulseStatus(entry.pulse)!.variant}>
                                {getPulseStatus(entry.pulse)!.label}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthDiary;
