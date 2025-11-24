import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface GeneticMarker {
  gene: string;
  variant: string;
  status: 'normal' | 'variant' | 'mutation';
  risk: 'low' | 'medium' | 'high';
  description: string;
  recommendations: string[];
}

interface GeneticMarkersTabProps {
  markers: GeneticMarker[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'normal': return 'default';
    case 'variant': return 'secondary';
    case 'mutation': return 'destructive';
    default: return 'default';
  }
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'low': return 'default';
    case 'medium': return 'secondary';
    case 'high': return 'destructive';
    default: return 'default';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'normal': return 'Норма';
    case 'variant': return 'Вариант';
    case 'mutation': return 'Мутация';
    default: return 'Норма';
  }
};

const getRiskLabel = (risk: string) => {
  switch (risk) {
    case 'low': return 'Низкий';
    case 'medium': return 'Средний';
    case 'high': return 'Высокий';
    default: return 'Низкий';
  }
};

const GeneticMarkersTab = ({ markers }: GeneticMarkersTabProps) => {
  return (
    <div className="space-y-4">
      {markers.map((marker, idx) => (
        <Card key={idx}>
          <CardContent className="pt-6 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-lg">{marker.gene}</h4>
                  <Badge variant={getStatusColor(marker.status) as any}>
                    {getStatusLabel(marker.status)}
                  </Badge>
                  <Badge variant={getRiskColor(marker.risk) as any}>
                    Риск: {getRiskLabel(marker.risk)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground font-mono">
                  {marker.variant}
                </p>
              </div>
            </div>

            <p className="text-sm">{marker.description}</p>

            {marker.recommendations.length > 0 && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h5 className="text-sm font-medium flex items-center gap-2">
                    <Icon name="Lightbulb" size={16} />
                    Рекомендации
                  </h5>
                  <ul className="space-y-1">
                    {marker.recommendations.map((rec, rIdx) => (
                      <li key={rIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GeneticMarkersTab;
