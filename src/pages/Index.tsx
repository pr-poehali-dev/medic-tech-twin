import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import HealthDiary from '@/components/HealthDiary';
import Lifestyle from '@/components/Lifestyle';
import Recommendations from '@/components/Recommendations';
import Prognosis from '@/components/Prognosis';
import AIAssistant from '@/components/AIAssistant';
import Genome from '@/components/Genome';
import DashboardTab from '@/components/dashboard/DashboardTab';
import MedicationsTab from '@/components/dashboard/MedicationsTab';
import SymptomsTab from '@/components/dashboard/SymptomsTab';
import TestsTab from '@/components/dashboard/TestsTab';
import ProfileTab from '@/components/dashboard/ProfileTab';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const medications = [
    { name: 'Аспирин', dosage: '100 мг', time: '09:00', taken: true },
    { name: 'Метформин', dosage: '500 мг', time: '14:00', taken: false },
    { name: 'Лизиноприл', dosage: '10 мг', time: '21:00', taken: false },
  ];

  const symptoms = [
    { date: '20 ноя', mood: 85, energy: 70, sleep: 90 },
    { date: '19 ноя', mood: 75, energy: 65, sleep: 85 },
    { date: '18 ноя', mood: 90, energy: 80, sleep: 95 },
    { date: '17 ноя', mood: 70, energy: 60, sleep: 80 },
  ];

  const tests = [
    { name: 'Общий анализ крови', date: '15 ноя 2024', status: 'Норма', icon: 'Activity' },
    { name: 'Биохимический анализ', date: '10 ноя 2024', status: 'Ожидание', icon: 'FlaskConical' },
    { name: 'ЭКГ', date: '5 ноя 2024', status: 'Норма', icon: 'HeartPulse' },
  ];

  const aiRecommendations = [
    { text: 'Увеличьте потребление воды до 2 литров в день', priority: 'high' },
    { text: 'Рекомендуется консультация кардиолога', priority: 'medium' },
    { text: 'Отличная динамика показателей сна', priority: 'low' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Icon name="HeartPulse" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Мой Медицинский Близнец</h1>
                <p className="text-sm text-muted-foreground">Ваше здоровье под контролем AI</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-1.5">
                <Icon name="Shield" size={14} />
                Данные зашифрованы
              </Badge>
              <Avatar>
                <AvatarFallback className="bg-primary text-white">АИ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 md:grid-cols-11 lg:w-auto lg:inline-grid">
            <TabsTrigger value="dashboard" className="gap-2">
              <Icon name="LayoutDashboard" size={16} />
              <span className="hidden sm:inline">Панель</span>
            </TabsTrigger>
            <TabsTrigger value="genome" className="gap-2">
              <Icon name="Dna" size={16} />
              <span className="hidden sm:inline">Геном</span>
            </TabsTrigger>
            <TabsTrigger value="assistant" className="gap-2">
              <Icon name="Bot" size={16} />
              <span className="hidden sm:inline">Ассистент</span>
            </TabsTrigger>
            <TabsTrigger value="prognosis" className="gap-2">
              <Icon name="TrendingUp" size={16} />
              <span className="hidden sm:inline">Прогноз</span>
            </TabsTrigger>
            <TabsTrigger value="diary" className="gap-2">
              <Icon name="BookOpen" size={16} />
              <span className="hidden sm:inline">Дневник</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="gap-2">
              <Icon name="ClipboardList" size={16} />
              <span className="hidden sm:inline">Рекомендации</span>
            </TabsTrigger>
            <TabsTrigger value="lifestyle" className="gap-2">
              <Icon name="HeartPulse" size={16} />
              <span className="hidden sm:inline">Образ жизни</span>
            </TabsTrigger>
            <TabsTrigger value="medications" className="gap-2">
              <Icon name="Pill" size={16} />
              <span className="hidden sm:inline">Лекарства</span>
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="gap-2">
              <Icon name="Activity" size={16} />
              <span className="hidden sm:inline">Симптомы</span>
            </TabsTrigger>
            <TabsTrigger value="tests" className="gap-2">
              <Icon name="FileText" size={16} />
              <span className="hidden sm:inline">Анализы</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <Icon name="User" size={16} />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardTab aiRecommendations={aiRecommendations} />
          </TabsContent>

          <TabsContent value="genome" className="space-y-6 animate-fade-in">
            <Genome />
          </TabsContent>

          <TabsContent value="assistant" className="space-y-6 animate-fade-in">
            <AIAssistant />
          </TabsContent>

          <TabsContent value="prognosis" className="space-y-6 animate-fade-in">
            <Prognosis />
          </TabsContent>

          <TabsContent value="diary" className="space-y-6 animate-fade-in">
            <HealthDiary />
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6 animate-fade-in">
            <Recommendations />
          </TabsContent>

          <TabsContent value="lifestyle" className="space-y-6 animate-fade-in">
            <Lifestyle />
          </TabsContent>

          <TabsContent value="medications">
            <MedicationsTab medications={medications} />
          </TabsContent>

          <TabsContent value="symptoms">
            <SymptomsTab symptoms={symptoms} />
          </TabsContent>

          <TabsContent value="tests">
            <TestsTab tests={tests} />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;