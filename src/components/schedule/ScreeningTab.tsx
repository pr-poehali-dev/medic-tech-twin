import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Screening {
  name: string;
  age: string;
  frequency: string;
  current: boolean;
}

interface ScreeningCategory {
  category: string;
  icon: string;
  screenings: Screening[];
}

interface ScreeningTabProps {
  screeningByAge: ScreeningCategory[];
}

const ScreeningTab = ({ screeningByAge }: ScreeningTabProps) => {
  return (
    <div className="space-y-4">
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div className="text-sm space-y-1">
              <p className="font-medium">Специализированные скрининги</p>
              <p className="text-muted-foreground">
                Регулярные обследования для ранней диагностики заболеваний.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {screeningByAge.map((category, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Icon name={category.icon as any} size={20} />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.screenings.map((screening, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h5 className="font-medium text-sm">{screening.name}</h5>
                          {screening.current && (
                            <Badge variant="default" className="text-xs">Актуально</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Icon name="User" size={10} />
                            {screening.age}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Clock" size={10} />
                            {screening.frequency}
                          </span>
                        </div>
                      </div>
                    </div>
                    {sIdx < category.screenings.length - 1 && (
                      <div className="border-b border-border/50 pt-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScreeningTab;
