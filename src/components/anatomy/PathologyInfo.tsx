import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface PathologyMarker {
  name: string;
  severity: string;
  icon: string;
  color: string;
  description: string;
}

interface PathologyInfoProps {
  pathologyMarkers: PathologyMarker[];
}

const PathologyInfo = ({ pathologyMarkers }: PathologyInfoProps) => {
  return (
    <>
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
    </>
  );
};

export default PathologyInfo;
