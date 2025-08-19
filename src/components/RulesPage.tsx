import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const RulesPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-inter text-3xl font-bold text-gray-900 mb-2">
          Правила площадки
        </h2>
        <p className="font-opensans text-gray-600">
          Ознакомьтесь с правилами покупки и продажи номеров
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-inter flex items-center gap-2">
              <Icon name="FileText" size={20} />
              Общие правила
            </CardTitle>
          </CardHeader>
          <CardContent className="font-opensans space-y-3">
            <p>• Все операции с номерами должны соответствовать действующему законодательству РФ</p>
            <p>• Продажа номеров осуществляется только вместе с техническими документами</p>
            <p>• Администрация не несет ответственности за сделки между пользователями</p>
            <p>• Запрещено размещение недостоверной информации о номерах</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-inter flex items-center gap-2">
              <Icon name="ShoppingCart" size={20} />
              Правила покупки
            </CardTitle>
          </CardHeader>
          <CardContent className="font-opensans space-y-3">
            <p>• Перед покупкой обязательно проверьте подлинность документов</p>
            <p>• Встречи для осмотра номеров проводите в безопасных местах</p>
            <p>• Не передавайте деньги до получения всех необходимых документов</p>
            <p>• При возникновении споров обращайтесь в службу поддержки</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-inter flex items-center gap-2">
              <Icon name="Upload" size={20} />
              Правила продажи
            </CardTitle>
          </CardHeader>
          <CardContent className="font-opensans space-y-3">
            <p>• Указывайте только актуальную информацию о номере</p>
            <p>• Загружайте качественные фотографии номера и документов</p>
            <p>• Отвечайте на вопросы покупателей в течение 24 часов</p>
            <p>• Уведомляйте администрацию о завершении сделки</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-inter flex items-center gap-2">
              <Icon name="AlertTriangle" size={20} />
              Ответственность
            </CardTitle>
          </CardHeader>
          <CardContent className="font-opensans space-y-3">
            <p>• За нарушение правил пользователь может быть заблокирован</p>
            <p>• Мошенничество и обман других пользователей недопустимы</p>
            <p>• Администрация оставляет за собой право удалять подозрительные объявления</p>
            <p>• При серьезных нарушениях информация передается в правоохранительные органы</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RulesPage;