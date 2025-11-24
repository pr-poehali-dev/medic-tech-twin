import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const PatientHeader = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-background border-blue-500/20">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Icon name="User" size={32} className="text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Ким Джису (Kim Jisoo)</h3>
              <p className="text-sm text-muted-foreground">29 лет, Женщина</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">ID: #12847</Badge>
                <Badge variant="outline">Группа крови: A (II) Rh+</Badge>
              </div>
            </div>
          </div>
          <div className="text-right space-y-1">
            <p className="text-sm text-muted-foreground">Дата регистрации</p>
            <p className="font-medium">15 января 2020</p>
            <p className="text-sm text-muted-foreground">Последний визит: 20 ноя 2024</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientHeader;
