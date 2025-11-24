import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import HumanBodyModel from '@/components/HumanBodyModel';

interface Test {
  name: string;
  date: string;
  status: string;
  icon: string;
}

interface TestsTabProps {
  tests: Test[];
}

const TestsTab = ({ tests }: TestsTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="FileText" size={24} />
              Результаты анализов
            </CardTitle>
            <CardDescription>Последние медицинские тесты</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {tests.map((test, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name={test.icon as any} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{test.name}</h4>
                    <p className="text-sm text-muted-foreground">{test.date}</p>
                  </div>
                </div>
                <Badge variant={test.status === 'Норма' ? 'default' : 'secondary'}>
                  {test.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="User" size={24} />
              Карта здоровья
            </CardTitle>
            <CardDescription>Визуализация состояния организма</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <HumanBodyModel />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="CalendarPlus" size={24} />
            Запланированные обследования
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">УЗИ брюшной полости</h4>
                <p className="text-sm text-muted-foreground">25 ноября 2024</p>
              </div>
              <Button variant="outline" size="sm">
                <Icon name="Calendar" size={16} />
                В календарь
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestsTab;
