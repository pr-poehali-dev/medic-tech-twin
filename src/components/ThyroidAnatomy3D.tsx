import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

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

  const getTransform = () => {
    return `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`;
  };

  const renderThyroid = (isHypothyroid: boolean) => {
    const opacity = 1 - transparency / 100;
    
    return (
      <svg 
        viewBox="0 0 360 400" 
        className="w-full h-full"
        style={{ transform: getTransform(), transformStyle: 'preserve-3d' }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="normalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E07A5F" stopOpacity={opacity} />
            <stop offset="100%" stopColor="#F4A261" stopOpacity={opacity} />
          </linearGradient>
          <linearGradient id="hypothyroidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9A6D63" stopOpacity={opacity} />
            <stop offset="100%" stopColor="#8B7355" stopOpacity={opacity} />
          </linearGradient>
          <pattern id="texture" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1" fill="rgba(0,0,0,0.1)" />
          </pattern>
        </defs>

        {/* Trachea outline */}
        <rect 
          x="165" 
          y="240" 
          width="30" 
          height="100" 
          fill="none" 
          stroke="#94A3B8" 
          strokeWidth="2"
          strokeDasharray="4,4"
          opacity="0.3"
        />
        
        {/* Right Lobe */}
        <g
          onClick={() => setSelectedPart('right-lobe')}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        >
          <path
            d={thyroidParts[0].path}
            fill={isHypothyroid ? "url(#hypothyroidGradient)" : "url(#normalGradient)"}
            stroke={selectedPart === 'right-lobe' ? '#3B82F6' : '#64748B'}
            strokeWidth={selectedPart === 'right-lobe' ? '3' : '2'}
            filter={selectedPart === 'right-lobe' ? 'url(#glow)' : ''}
          />
          {isHypothyroid && (
            <path d={thyroidParts[0].path} fill="url(#texture)" />
          )}
          {showLabels && (
            <text x="140" y="180" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">
              R
            </text>
          )}
        </g>

        {/* Left Lobe */}
        <g
          onClick={() => setSelectedPart('left-lobe')}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        >
          <path
            d={thyroidParts[1].path}
            fill={isHypothyroid ? "url(#hypothyroidGradient)" : "url(#normalGradient)"}
            stroke={selectedPart === 'left-lobe' ? '#3B82F6' : '#64748B'}
            strokeWidth={selectedPart === 'left-lobe' ? '3' : '2'}
            filter={selectedPart === 'left-lobe' ? 'url(#glow)' : ''}
          />
          {isHypothyroid && (
            <path d={thyroidParts[1].path} fill="url(#texture)" />
          )}
          {showLabels && (
            <text x="220" y="180" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">
              L
            </text>
          )}
        </g>

        {/* Isthmus */}
        <g
          onClick={() => setSelectedPart('isthmus')}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        >
          <path
            d={thyroidParts[2].path}
            fill={isHypothyroid ? thyroidParts[2].hypothyroidColor : thyroidParts[2].normalColor}
            fillOpacity={opacity}
            stroke={selectedPart === 'isthmus' ? '#3B82F6' : '#64748B'}
            strokeWidth={selectedPart === 'isthmus' ? '3' : '2'}
            filter={selectedPart === 'isthmus' ? 'url(#glow)' : ''}
          />
          {showLabels && (
            <text x="180" y="192" fontSize="10" fill="white" textAnchor="middle">
              Перешеек
            </text>
          )}
        </g>

        {/* Blood Vessels */}
        <g
          onClick={() => setSelectedPart('blood-vessels')}
          className="cursor-pointer"
          opacity={opacity}
        >
          {(isHypothyroid ? thyroidParts[3].pathHypothyroid : thyroidParts[3].pathNormal)?.map((path, idx) => (
            <path
              key={idx}
              d={path}
              fill="none"
              stroke={isHypothyroid ? thyroidParts[3].hypothyroidColor : thyroidParts[3].normalColor}
              strokeWidth={isHypothyroid ? '2' : '3'}
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* Follicles (microscopic representation) */}
        {transparency < 50 && (
          <g
            onClick={() => setSelectedPart('follicles')}
            className="cursor-pointer"
            opacity={opacity * 0.6}
          >
            {thyroidParts[4].circles?.map((circle, idx) => (
              <circle
                key={idx}
                cx={circle.cx}
                cy={circle.cy}
                r={isHypothyroid ? circle.r * 0.7 : circle.r}
                fill={isHypothyroid ? thyroidParts[4].hypothyroidColor : thyroidParts[4].normalColor}
                stroke="#64748B"
                strokeWidth="1"
              />
            ))}
          </g>
        )}

        {/* Pathology markers for hypothyroid */}
        {isHypothyroid && transparency < 70 && (
          <>
            {/* Fibrosis areas */}
            <ellipse cx="145" cy="160" rx="15" ry="10" fill="#6B7280" opacity="0.4" />
            <ellipse cx="215" cy="210" rx="12" ry="8" fill="#6B7280" opacity="0.4" />
            
            {/* Inflammation markers */}
            <circle cx="130" cy="190" r="4" fill="#F59E0B" opacity="0.7" />
            <circle cx="160" cy="210" r="3" fill="#F59E0B" opacity="0.7" />
            <circle cx="200" cy="170" r="3" fill="#F59E0B" opacity="0.7" />
            <circle cx="225" cy="195" r="4" fill="#F59E0B" opacity="0.7" />
          </>
        )}

        {/* Anatomical labels */}
        {showLabels && (
          <>
            <line x1="120" y1="150" x2="80" y2="120" stroke="#94A3B8" strokeWidth="1" />
            <text x="75" y="115" fontSize="10" fill="#94A3B8">Верхний полюс</text>
            
            <line x1="120" y1="220" x2="80" y2="260" stroke="#94A3B8" strokeWidth="1" />
            <text x="75" y="270" fontSize="10" fill="#94A3B8">Нижний полюс</text>
            
            <line x1="180" y1="240" x2="180" y2="290" stroke="#94A3B8" strokeWidth="1" />
            <text x="170" y="305" fontSize="10" fill="#94A3B8">Трахея</text>
          </>
        )}
      </svg>
    );
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
              {renderThyroid(viewMode === 'compare' ? false : viewMode === 'hypothyroid')}
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
                {renderThyroid(true)}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Settings" size={20} />
            Управление моделью
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                <span>Вращение X: {rotation.x}°</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRotate('x', 20)}
                >
                  <Icon name="RotateCw" size={14} />
                </Button>
              </label>
              <Slider
                value={[rotation.x]}
                onValueChange={([value]) => handleRotate('x', value)}
                min={-180}
                max={180}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                <span>Вращение Y: {rotation.y}°</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRotate('y', 30)}
                >
                  <Icon name="RotateCw" size={14} />
                </Button>
              </label>
              <Slider
                value={[rotation.y]}
                onValueChange={([value]) => handleRotate('y', value)}
                min={-180}
                max={180}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                <span>Прозрачность: {transparency}%</span>
              </label>
              <Slider
                value={[transparency]}
                onValueChange={([value]) => setTransparency(value)}
                min={0}
                max={90}
                step={5}
              />
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant={autoRotate ? 'default' : 'outline'}
                onClick={() => setAutoRotate(!autoRotate)}
                className="flex-1 mr-2"
              >
                <Icon name={autoRotate ? 'Pause' : 'Play'} size={16} />
                {autoRotate ? 'Остановить' : 'Автовращение'}
              </Button>
              <Button
                variant={showLabels ? 'default' : 'outline'}
                onClick={() => setShowLabels(!showLabels)}
                className="flex-1"
              >
                <Icon name="Tag" size={16} />
                Подписи
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Activity" size={20} />
            Патологические изменения
          </CardTitle>
          <CardDescription>
            Основные признаки гипотиреоза на анатомическом уровне
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {pathologyMarkers.map((marker, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Icon name={marker.icon as any} className={marker.color} size={24} />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">{marker.name}</h4>
                        <Badge variant="outline">{marker.severity}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {marker.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Differences Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="GitCompare" size={20} />
            Сравнительная таблица изменений
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4 pb-2 border-b font-medium text-sm">
              <div>Параметр</div>
              <div className="text-green-600">Норма</div>
              <div className="text-orange-600">Гипотиреоз</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-muted-foreground">Размер долей</div>
              <div>4-6 см</div>
              <div>3-4 см ↓</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-muted-foreground">Объем железы</div>
              <div>15-25 мл</div>
              <div>10-18 мл ↓</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-muted-foreground">Кровоток</div>
              <div>100% (норма)</div>
              <div>60-70% ↓</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-muted-foreground">Эхоструктура</div>
              <div>Однородная</div>
              <div>Неоднородная</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-muted-foreground">Фолликулы</div>
              <div>200-300 мкм</div>
              <div>Атрофия/увеличение</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-muted-foreground">Фиброз</div>
              <div>Отсутствует</div>
              <div>Присутствует</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 text-sm">
            <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <p className="font-medium">О 3D визуализации</p>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Модель основана на реальных анатомических данных и результатах УЗИ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Изменения соответствуют субклиническому гипотиреозу пациента</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Используйте слайдеры для детального изучения анатомии</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Кликайте на части железы для подробной информации</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThyroidAnatomy3D;
