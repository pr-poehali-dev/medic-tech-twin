import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface BodyPart {
  id: string;
  name: string;
  status: 'good' | 'warning' | 'attention';
  notes?: string;
}

const HumanBodyModel = () => {
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);
  const [viewMode, setViewMode] = useState<'front' | 'back'>('front');

  const bodyParts: BodyPart[] = [
    { id: 'head', name: 'Голова', status: 'good' },
    { id: 'chest', name: 'Грудная клетка', status: 'warning', notes: 'Лёгкий дискомфорт' },
    { id: 'stomach', name: 'Живот', status: 'good' },
    { id: 'left-arm', name: 'Левая рука', status: 'good' },
    { id: 'right-arm', name: 'Правая рука', status: 'good' },
    { id: 'left-leg', name: 'Левая нога', status: 'attention', notes: 'Требует внимания' },
    { id: 'right-leg', name: 'Правая нога', status: 'good' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'attention': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'good': return <Badge className="bg-secondary text-white border-0">Норма</Badge>;
      case 'warning': return <Badge className="bg-[#F59E0B] text-white border-0">Наблюдение</Badge>;
      case 'attention': return <Badge variant="destructive">Внимание</Badge>;
      default: return null;
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Icon name="User" className="text-primary" />
              Карта тела
            </CardTitle>
            <CardDescription>Нажмите на часть тела для подробностей</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'front' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('front')}
            >
              Спереди
            </Button>
            <Button
              variant={viewMode === 'back' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('back')}
            >
              Сзади
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative bg-gradient-to-b from-muted/30 to-muted/10 rounded-2xl p-8 flex items-center justify-center min-h-[500px]">
            <svg
              viewBox="0 0 200 400"
              className="w-full max-w-[250px] h-auto"
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
            >
              <ellipse
                cx="100"
                cy="40"
                rx="30"
                ry="35"
                fill={getStatusColor(bodyParts.find(p => p.id === 'head')?.status || 'good')}
                className="cursor-pointer transition-all hover:opacity-80"
                onClick={() => setSelectedPart(bodyParts.find(p => p.id === 'head') || null)}
                opacity="0.85"
              />
              
              <rect
                x="70"
                y="75"
                width="60"
                height="80"
                rx="15"
                fill={getStatusColor(bodyParts.find(p => p.id === 'chest')?.status || 'good')}
                className="cursor-pointer transition-all hover:opacity-80"
                onClick={() => setSelectedPart(bodyParts.find(p => p.id === 'chest') || null)}
                opacity="0.85"
              />
              
              <rect
                x="75"
                y="155"
                width="50"
                height="60"
                rx="12"
                fill={getStatusColor(bodyParts.find(p => p.id === 'stomach')?.status || 'good')}
                className="cursor-pointer transition-all hover:opacity-80"
                onClick={() => setSelectedPart(bodyParts.find(p => p.id === 'stomach') || null)}
                opacity="0.85"
              />
              
              <rect
                x="35"
                y="80"
                width="25"
                height="100"
                rx="12"
                fill={getStatusColor(bodyParts.find(p => p.id === 'left-arm')?.status || 'good')}
                className="cursor-pointer transition-all hover:opacity-80"
                onClick={() => setSelectedPart(bodyParts.find(p => p.id === 'left-arm') || null)}
                opacity="0.85"
              />
              
              <rect
                x="140"
                y="80"
                width="25"
                height="100"
                rx="12"
                fill={getStatusColor(bodyParts.find(p => p.id === 'right-arm')?.status || 'good')}
                className="cursor-pointer transition-all hover:opacity-80"
                onClick={() => setSelectedPart(bodyParts.find(p => p.id === 'right-arm') || null)}
                opacity="0.85"
              />
              
              <rect
                x="75"
                y="215"
                width="20"
                height="160"
                rx="10"
                fill={getStatusColor(bodyParts.find(p => p.id === 'left-leg')?.status || 'good')}
                className="cursor-pointer transition-all hover:opacity-80"
                onClick={() => setSelectedPart(bodyParts.find(p => p.id === 'left-leg') || null)}
                opacity="0.85"
              />
              
              <rect
                x="105"
                y="215"
                width="20"
                height="160"
                rx="10"
                fill={getStatusColor(bodyParts.find(p => p.id === 'right-leg')?.status || 'good')}
                className="cursor-pointer transition-all hover:opacity-80"
                onClick={() => setSelectedPart(bodyParts.find(p => p.id === 'right-leg') || null)}
                opacity="0.85"
              />
            </svg>

            <div className="absolute bottom-4 left-4 right-4 bg-card/80 backdrop-blur-sm rounded-lg p-3 border">
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  <span>Норма</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                  <span>Наблюдение</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <span>Внимание</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {selectedPart ? (
              <div className="space-y-4 animate-scale-in">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{selectedPart.name}</h3>
                    {getStatusBadge(selectedPart.status)}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPart(null)}
                  >
                    <Icon name="X" size={18} />
                  </Button>
                </div>

                {selectedPart.notes && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm">{selectedPart.notes}</p>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Activity" size={16} className="text-primary" />
                      <span className="font-medium text-sm">Последние данные</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Осмотр: 18 ноября 2024
                    </p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="FileText" size={16} className="text-primary" />
                      <span className="font-medium text-sm">Связанные анализы</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Общий анализ крови (15 ноя)
                    </p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Brain" size={16} className="text-accent" />
                      <span className="font-medium text-sm">AI рекомендация</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedPart.status === 'attention'
                        ? 'Рекомендуется консультация специалиста'
                        : selectedPart.status === 'warning'
                        ? 'Продолжайте наблюдение, улучшения заметны'
                        : 'Показатели в норме, продолжайте в том же духе'}
                    </p>
                  </div>
                </div>

                <Button className="w-full">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить симптом
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Hand" className="text-primary" size={32} />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Выберите часть тела</h3>
                  <p className="text-sm text-muted-foreground">
                    Нажмите на любую область модели, чтобы увидеть детальную информацию о состоянии
                  </p>
                </div>
              </div>
            )}

            <div className="pt-4 space-y-2">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Icon name="AlertCircle" size={16} className="text-primary" />
                Быстрый обзор
              </h4>
              <div className="space-y-2">
                {bodyParts
                  .filter(part => part.status !== 'good')
                  .map((part) => (
                    <div
                      key={part.id}
                      className="flex items-center justify-between p-2 rounded-lg border bg-card/50 cursor-pointer hover:bg-accent/5 transition-colors"
                      onClick={() => setSelectedPart(part)}
                    >
                      <span className="text-sm">{part.name}</span>
                      {getStatusBadge(part.status)}
                    </div>
                  ))}
                {bodyParts.filter(part => part.status !== 'good').length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Все показатели в норме! 🎉
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HumanBodyModel;
