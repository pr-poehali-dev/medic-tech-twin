import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Здравствуйте! Я ваш виртуальный медицинский ассистент. Могу ответить на вопросы о вашем здоровье, лекарствах, анализах и дать рекомендации. Чем могу помочь?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    'Когда принимать лекарства?',
    'Какое у меня давление сегодня?',
    'Что значат мои анализы?',
    'Как улучшить сон?',
    'Можно ли мне заниматься спортом?',
    'Что делать при головной боли?'
  ];

  const getAssistantResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('лекарств') || lowerMessage.includes('таблетк') || lowerMessage.includes('принимать')) {
      return 'По вашему расписанию на сегодня:\n\n• Аспирин 100 мг в 09:00 (уже принят ✓)\n• Метформин 500 мг в 14:00 (осталось принять)\n• Лизиноприл 10 мг в 21:00 (осталось принять)\n\nВажно принимать лекарства строго по времени для лучшего эффекта. Хотите установить напоминания?';
    }

    if (lowerMessage.includes('давлени') || lowerMessage.includes('120') || lowerMessage.includes('140')) {
      return 'По последней записи в дневнике:\n\n📊 Давление: 120/80 мм рт.ст.\n🌡️ Температура: 36.6°C\n❤️ Пульс: 72 уд/мин\n\nВаши показатели в норме! Продолжайте контролировать давление утром и вечером. При показателях выше 140/90 обратитесь к кардиологу.';
    }

    if (lowerMessage.includes('анализ') || lowerMessage.includes('тест') || lowerMessage.includes('результат')) {
      return 'Ваши последние анализы:\n\n✓ Общий анализ крови (15 ноя) - Норма\n⏳ Биохимический анализ (10 ноя) - Ожидание результатов\n✓ ЭКГ (5 ноя) - Норма\n\nВсе показатели в пределах нормы. Биохимический анализ будет готов в течение 2-3 дней. Хотите, чтобы я уведомил вас?';
    }

    if (lowerMessage.includes('сон') || lowerMessage.includes('сплю') || lowerMessage.includes('бессонниц')) {
      return 'Для улучшения сна рекомендую:\n\n🌙 Ложиться в одно время (до 23:00)\n📱 Убрать гаджеты за час до сна\n☕ Избегать кофеина после 16:00\n🚶 Прогулка на свежем воздухе вечером\n🛏️ Проветривать комнату перед сном\n\nПо вашим данным, вы спите в среднем 7.5 часов - это хороший показатель. Есть проблемы с засыпанием?';
    }

    if (lowerMessage.includes('спорт') || lowerMessage.includes('упражнени') || lowerMessage.includes('физическ')) {
      return 'С учетом вашего состояния (гипертензия под контролем) рекомендую:\n\n✅ Разрешено:\n• Ходьба 30-60 минут в день\n• Плавание\n• Легкая йога\n• Велосипед в умеренном темпе\n\n⚠️ С осторожностью:\n• Интенсивные кардио\n• Тяжелая атлетика\n• Резкие нагрузки\n\nНачните с 10000 шагов в день. Контролируйте пульс - он не должен превышать 120 уд/мин.';
    }

    if (lowerMessage.includes('голов') || lowerMessage.includes('боль') || lowerMessage.includes('болит')) {
      return 'При головной боли важно:\n\n1️⃣ Измерить давление (возможная причина)\n2️⃣ Если давление в норме - выпить воды\n3️⃣ Проветрить помещение\n4️⃣ Прилечь в темной комнате на 15-20 минут\n\n⚠️ Обратитесь к врачу, если:\n• Боль очень сильная или внезапная\n• Сопровождается тошнотой/рвотой\n• Давление выше 140/90\n• Боль не проходит более 2 часов\n\nВы принимаете Аспирин, который может помочь при умеренной боли.';
    }

    if (lowerMessage.includes('диета') || lowerMessage.includes('питани') || lowerMessage.includes('еда')) {
      return 'Рекомендации по питанию для вас:\n\n✅ Включить в рацион:\n• Овощи и фрукты (5 порций в день)\n• Цельнозерновые продукты\n• Нежирная рыба 2-3 раза в неделю\n• Орехи (горсть в день)\n\n❌ Ограничить:\n• Соль (до 5г в день)\n• Сахар и сладости\n• Жареное и копченое\n• Алкоголь\n\nВы записываете приемы пищи в дневнике - это отлично помогает контролировать питание!';
    }

    if (lowerMessage.includes('вес') || lowerMessage.includes('похудеть') || lowerMessage.includes('килограмм')) {
      return 'Ваши данные:\n📊 Текущий вес: 80 кг\n📏 Рост: 175 см\n📈 ИМТ: 26.1 (небольшой избыток веса)\n\nРекомендуемая цель: снижение на 5-7% (4-6 кг за 3-6 месяцев)\n\nЭто поможет:\n• Улучшить контроль давления\n• Снизить риск диабета\n• Уменьшить нагрузку на сердце\n\nДостижимо через питание и 10000 шагов в день!';
    }

    if (lowerMessage.includes('прогноз') || lowerMessage.includes('будущее') || lowerMessage.includes('выздоров')) {
      return 'По вашим данным прогноз благоприятный! 🎯\n\n✨ При соблюдении текущей терапии:\n• 75% вероятность стабилизации давления\n• 65% вероятность предотвращения диабета\n• Снижение рисков осложнений\n\nВы на правильном пути:\n✓ Регулярно принимаете лекарства\n✓ Контролируете показатели\n✓ Ведете дневник здоровья\n\nПродолжайте в том же духе! Подробнее смотрите в разделе "Прогноз".';
    }

    if (lowerMessage.includes('врач') || lowerMessage.includes('доктор') || lowerMessage.includes('специалист')) {
      return 'Ваши специалисты:\n\n👨‍⚕️ Кардиолог - Доктор Иванов А.П.\n   Последний визит: 20 ноя\n   Следующий прием: рекомендован через 1 месяц\n\n👩‍⚕️ Эндокринолог - Доктор Петрова Е.С.\n   Последний визит: 18 ноя\n   Контроль глюкозы: каждые 3 месяца\n\nЕсть вопрос к конкретному специалисту?';
    }

    if (lowerMessage.includes('спасибо') || lowerMessage.includes('благодар')) {
      return 'Пожалуйста! Рад помочь! 😊 Если появятся еще вопросы - обращайтесь в любое время. Забота о здоровье - это важно!';
    }

    if (lowerMessage.includes('привет') || lowerMessage.includes('здравств')) {
      return 'Здравствуйте! Рад снова вас видеть! Как вы себя чувствуете сегодня? Могу помочь с информацией о лекарствах, анализах или дать рекомендации по здоровью.';
    }

    return 'Я анализирую ваш вопрос... 🤔\n\nМогу помочь с информацией о:\n• Лекарствах и времени приема\n• Показателях здоровья\n• Результатах анализов\n• Рекомендациях по питанию и активности\n• Прогнозе состояния\n\nУточните, пожалуйста, что именно вас интересует?';
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAssistantResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Bot" size={24} />
            AI Медицинский ассистент
          </CardTitle>
          <CardDescription>
            Задавайте вопросы о своем здоровье, получайте рекомендации и советы
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse-soft" />
              <span className="text-sm font-medium">Ассистент онлайн</span>
            </div>
            <Badge variant="outline" className="gap-1.5">
              <Icon name="Shield" size={12} />
              Конфиденциально
            </Badge>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <div className="h-[500px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <Avatar className={`w-8 h-8 flex-shrink-0 ${message.role === 'assistant' ? 'bg-primary' : 'bg-secondary'}`}>
                    <AvatarFallback className="text-white text-sm">
                      {message.role === 'assistant' ? (
                        <Icon name="Stethoscope" size={16} />
                      ) : (
                        <Icon name="User" size={16} />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex flex-col gap-1 max-w-[80%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary/50'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                    <span className="text-xs text-muted-foreground px-1">
                      {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8 flex-shrink-0 bg-primary">
                    <AvatarFallback className="text-white text-sm">
                      <Icon name="Stethoscope" size={16} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg p-3 bg-secondary/50">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <Separator />

            <div className="p-4 space-y-3">
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs"
                  >
                    {question}
                  </Button>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Напишите ваш вопрос..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isTyping}
                />
                <Button onClick={handleSend} disabled={!inputValue.trim() || isTyping}>
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 text-sm">
            <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="font-medium">Важно помнить</p>
              <p className="text-muted-foreground">
                Ассистент использует ваши медицинские данные из приложения для персонализированных ответов. 
                Это не замена консультации с врачом. При серьезных симптомах обращайтесь к специалисту.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;
