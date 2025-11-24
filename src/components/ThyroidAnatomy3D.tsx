import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import ThyroidModel from '@/components/anatomy/ThyroidModel';
import ModelControls from '@/components/anatomy/ModelControls';
import PathologyInfo from '@/components/anatomy/PathologyInfo';

type ViewMode = 'normal' | 'hypothyroid' | 'compare';
type RotationAxis = 'x' | 'y' | 'z';

const ThyroidAnatomy3D = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('hypothyroid');
  const [rotation, setRotation] = useState({ x: 20, y: 30, z: 0 });
  const [autoRotate, setAutoRotate] = useState(false);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(true);
  const [transparency, setTransparency] = useState(0);

  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setRotation(prev => ({ ...prev, y: (prev.y + 1) % 360 }));
    }, 50);
    return () => clearInterval(interval);
  }, [autoRotate]);

  const thyroidParts = [
    {
      id: 'right-lobe',
      name: 'Правая доля',
      normalSize: '4-6 см',
      hypothyroidSize: '3-4 см (уменьшена)',
      normalColor: '#E07A5F',
      hypothyroidColor: '#9A6D63',
      description: 'Правая доля щитовидной железы',
      changes: 'Уменьшение размера, снижение васкуляризации, неоднородная структура',
      path: 'M 120 150 Q 140 120, 160 150 L 160 220 Q 140 240, 120 220 Z'
    },
    {
      id: 'left-lobe',
      name: 'Левая доля',
      normalSize: '4-6 см',
      hypothyroidSize: '3-4 см (уменьшена)',
      normalColor: '#E07A5F',
      hypothyroidColor: '#9A6D63',
      description: 'Левая доля щитовидной железы',
      changes: 'Уменьшение размера, снижение васкуляризации, неоднородная структура',
      path: 'M 240 150 Q 220 120, 200 150 L 200 220 Q 220 240, 240 220 Z'
    },
    {
      id: 'isthmus',
      name: 'Перешеек',
      normalSize: '1-2 см',
      hypothyroidSize: '0.5-1 см (истончен)',
      normalColor: '#E89B8A',
      hypothyroidColor: '#A67C73',
      description: 'Соединяет правую и левую доли',
      changes: 'Истончение, фиброзные изменения',
      path: 'M 160 180 L 200 180 L 200 195 L 160 195 Z'
    },
    {
      id: 'blood-vessels',
      name: 'Кровеносные сосуды',
      normalSize: 'Нормальная васкуляризация',
      hypothyroidSize: 'Сниженный кровоток',
      normalColor: '#C1121F',
      hypothyroidColor: '#7A2828',
      description: 'Верхняя и нижняя щитовидные артерии',
      changes: 'Снижение кровотока на 30-40%',
      pathNormal: [
        'M 140 140 Q 150 120, 140 100',
        'M 220 140 Q 210 120, 220 100',
        'M 150 230 Q 160 250, 150 270',
        'M 210 230 Q 200 250, 210 270'
      ],
      pathHypothyroid: [
        'M 140 150 L 140 120',
        'M 220 150 L 220 120',
        'M 150 220 L 150 240',
        'M 210 220 L 210 240'
      ]
    },
    {
      id: 'follicles',
      name: 'Фолликулы',
      normalSize: 'Нормальные (200-300 мкм)',
      hypothyroidSize: 'Увеличены или атрофированы',
      normalColor: '#F4A261',
      hypothyroidColor: '#8B7355',
      description: 'Структурные единицы железы',
      changes: 'Коллоидная дегенерация, лимфоцитарная инфильтрация',
      circles: [
        { cx: 140, cy: 170, r: 8 },
        { cx: 155, cy: 185, r: 7 },
        { cx: 140, cy: 200, r: 6 },
        { cx: 205, cy: 170, r: 8 },
        { cx: 220, cy: 185, r: 7 },
        { cx: 205, cy: 200, r: 6 }
      ]
    }
  ];

  const pathologyMarkers = [
    {
      name: 'Лимфоцитарная инфильтрация',
      severity: 'Умеренная',
      icon: 'Activity',
      color: 'text-orange-500',
      description: 'Проникновение иммунных клеток в ткань железы'
    },
    {
      name: 'Фиброз',
      severity: 'Начальная стадия',
      icon: 'Layers',
      color: 'text-blue-500',
      description: 'Замещение железистой ткани соединительной'
    },
    {
      name: 'Снижение васкуляризации',
      severity: 'Средняя',
      icon: 'Droplet',
      color: 'text-red-500',
      description: 'Уменьшение кровоснабжения на 35%'
    },
    {
      name: 'Атрофия фолликулов',
      severity: 'Легкая',
      icon: 'Hexagon',
      color: 'text-yellow-500',
      description: 'Уменьшение размера и функции фолликулов'
    }
  ];

  const handleRotate = (axis: RotationAxis, value: number) => {
    setRotation(prev => ({ ...prev, [axis]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">3D Анатомия щитовидной железы</h2>
          <p className="text-muted-foreground">
            Интерактивная визуализация при гипотиреозе
          </p>
        </div>
        <Badge variant="outline" className="gap-2">
          <Icon name="Layers" size={14} />
          3D Модель
        </Badge>
      </div>

      {/* View Mode Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Режим просмотра</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={viewMode === 'normal' ? 'default' : 'outline'}
              onClick={() => setViewMode('normal')}
              className="w-full"
            >
              <Icon name="CheckCircle2" size={16} />
              Норма
            </Button>
            <Button
              variant={viewMode === 'hypothyroid' ? 'default' : 'outline'}
              onClick={() => setViewMode('hypothyroid')}
              className="w-full"
            >
              <Icon name="AlertCircle" size={16} />
              Гипотиреоз
            </Button>
            <Button
              variant={viewMode === 'compare' ? 'default' : 'outline'}
              onClick={() => setViewMode('compare')}
              className="w-full"
            >
              <Icon name="GitCompare" size={16} />
              Сравнение
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 3D View */}
      <div className={`grid ${viewMode === 'compare' ? 'md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Scan" size={20} />
              {viewMode === 'compare' ? 'Нормальная щитовидная железа' : viewMode === 'normal' ? 'Нормальная анатомия' : 'Щитовидная железа при гипотиреозе'}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {viewMode === 'compare' ? 'Здоровая структура и кровоснабжение' : viewMode === 'normal' ? 'Здоровая структура железы' : 'Патологические изменения при гипотиреозе'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-slate-950 rounded-lg overflow-hidden">
              <ThyroidModel
                isHypothyroid={viewMode === 'compare' ? false : viewMode === 'hypothyroid'}
                rotation={rotation}
                transparency={transparency}
                showLabels={showLabels}
                selectedPart={selectedPart}
                setSelectedPart={setSelectedPart}
                thyroidParts={thyroidParts}
              />
            </div>
          </CardContent>
        </Card>

        {viewMode === 'compare' && (
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="AlertTriangle" size={20} />
                Щитовидная железа при гипотиреозе
              </CardTitle>
              <CardDescription className="text-slate-400">
                Патологические изменения структуры
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-slate-950 rounded-lg overflow-hidden">
                <ThyroidModel
                  isHypothyroid={true}
                  rotation={rotation}
                  transparency={transparency}
                  showLabels={showLabels}
                  selectedPart={selectedPart}
                  setSelectedPart={setSelectedPart}
                  thyroidParts={thyroidParts}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Controls */}
      <ModelControls
        rotation={rotation}
        transparency={transparency}
        autoRotate={autoRotate}
        showLabels={showLabels}
        handleRotate={handleRotate}
        setTransparency={setTransparency}
        setAutoRotate={setAutoRotate}
        setShowLabels={setShowLabels}
      />

      {/* Selected Part Details */}
      {selectedPart && (
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Icon name="Info" size={20} />
                {thyroidParts.find(p => p.id === selectedPart)?.name}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPart(null)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">В норме:</p>
                <p className="text-sm text-muted-foreground">
                  {thyroidParts.find(p => p.id === selectedPart)?.normalSize}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">При гипотиреозе:</p>
                <p className="text-sm text-muted-foreground">
                  {thyroidParts.find(p => p.id === selectedPart)?.hypothyroidSize}
                </p>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-sm font-medium mb-2">Патологические изменения:</p>
              <p className="text-sm text-muted-foreground">
                {thyroidParts.find(p => p.id === selectedPart)?.changes}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pathology Markers */}
      <PathologyInfo pathologyMarkers={pathologyMarkers} />
    </div>
  );
};

export default ThyroidAnatomy3D;
