import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

type RotationAxis = 'x' | 'y' | 'z';

interface ModelControlsProps {
  rotation: { x: number; y: number; z: number };
  transparency: number;
  autoRotate: boolean;
  showLabels: boolean;
  handleRotate: (axis: RotationAxis, value: number) => void;
  setTransparency: (value: number) => void;
  setAutoRotate: (value: boolean) => void;
  setShowLabels: (value: boolean) => void;
}

const ModelControls = ({
  rotation,
  transparency,
  autoRotate,
  showLabels,
  handleRotate,
  setTransparency,
  setAutoRotate,
  setShowLabels
}: ModelControlsProps) => {
  return (
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
  );
};

export default ModelControls;
