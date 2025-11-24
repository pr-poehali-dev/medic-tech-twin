import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface AIRecommendation {
  text: string;
  priority: string;
}

interface DashboardTabProps {
  aiRecommendations: AIRecommendation[];
}

const DashboardTab = ({ aiRecommendations }: DashboardTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="Stethoscope" size={32} className="text-primary" />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-semibold">Здравствуйте! Как вы себя сегодня чувствуете?</h3>
              <p className="text-muted-foreground">
                Я ваш виртуальный врач-ассистент. Готов помочь отслеживать ваше здоровье и отвечать на вопросы.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button size="sm" variant="default">
                  <Icon name="ThumbsUp" size={16} />
                  Отлично
                </Button>
                <Button size="sm" variant="outline">
                  <Icon name="Meh" size={16} />
                  Нормально
                </Button>
                <Button size="sm" variant="outline">
                  <Icon name="ThumbsDown" size={16} />
                  Плохо
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Icon name="Pill" className="text-primary" size={18} />
              Сегодняшние лекарства
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2/3</div>
            <Progress value={66} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Одна таблетка в 21:00</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Icon name="TrendingUp" className="text-secondary" size={18} />
              Общее самочувствие
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">82%</div>
            <div className="flex items-center gap-1 mt-2 text-secondary">
              <Icon name="ArrowUp" size={16} />
              <span className="text-sm font-medium">+5% за неделю</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Icon name="Brain" className="text-accent" size={18} />
              AI Ассистент
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse-soft" />
              <span className="text-sm">Активен и готов помочь</span>
            </div>
            <Button variant="outline" size="sm" className="mt-3 w-full">
              Задать вопрос
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Sparkles" size={20} />
            AI Рекомендации
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {aiRecommendations.map((rec, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
              <Icon 
                name={rec.priority === 'high' ? 'AlertCircle' : rec.priority === 'medium' ? 'Info' : 'CheckCircle2'} 
                size={20} 
                className={rec.priority === 'high' ? 'text-destructive' : rec.priority === 'medium' ? 'text-primary' : 'text-secondary'} 
              />
              <p className="text-sm flex-1">{rec.text}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardTab;
