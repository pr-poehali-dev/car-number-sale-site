import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface LicensePlate {
  id: string;
  number: string;
  region: string;
  price: number;
  seller: string;
  phone: string;
  description: string;
  featured?: boolean;
  image?: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('home');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [listings] = useState<LicensePlate[]>([
    {
      id: '1',
      number: 'А777АА',
      region: '77',
      price: 50000,
      seller: 'Иван Петров',
      phone: '+7 (999) 123-45-67',
      description: 'Красивый номер на авто премиум класса',
      featured: true,
      image: '/img/7728926c-b245-4a22-907a-b3342e6e0cdc.jpg'
    },
    {
      id: '2',
      number: 'О001ОО',
      region: '177',
      price: 120000,
      seller: 'Мария Сидорова',
      phone: '+7 (999) 234-56-78',
      description: 'Эксклюзивный номер для коллекционера',
      image: '/img/8553e8db-4c4e-4788-a4dc-17bd7f082212.jpg'
    },
    {
      id: '3',
      number: 'Н333НН',
      region: '199',
      price: 35000,
      seller: 'Алексей Иванов',
      phone: '+7 (999) 345-67-89',
      description: 'Хороший номер по доступной цене',
      image: '/img/357e84cf-736c-4206-9690-3b17f8b5f99d.jpg'
    }
  ]);

  const [newListing, setNewListing] = useState({
    number: '',
    region: '',
    price: '',
    seller: '',
    phone: '',
    description: ''
  });

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const regions = Array.from(new Set(listings.map(listing => listing.region)));

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.region.includes(searchQuery);
    const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1];
    const matchesRegion = selectedRegion === 'all' || listing.region === selectedRegion;
    
    return matchesSearch && matchesPrice && matchesRegion;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Новое объявление:', newListing);
    setNewListing({
      number: '',
      region: '',
      price: '',
      seller: '',
      phone: '',
      description: ''
    });
  };

  const HomePage = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-white rounded-lg">
        <h1 className="font-inter text-4xl font-bold text-gray-900 mb-4">
          Номера на Автомобили
        </h1>
        <p className="font-opensans text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Покупайте и продавайте красивые номера для ваших автомобилей
        </p>
        
        {/* Search Bar */}
        <div className="flex gap-2 max-w-md mx-auto mb-4">
          <div className="relative flex-1">
            <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Поиск по номеру или региону"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setShowFilters(!showFilters)} variant="outline">
            <Icon name="Filter" size={16} />
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg border shadow-sm max-w-2xl mx-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Цена (₽)</Label>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500000}
                    min={0}
                    step={5000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{priceRange[0].toLocaleString()}</span>
                    <span>{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Регион</Label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все регионы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все регионы</SelectItem>
                    {regions.map(region => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setPriceRange([0, 500000]);
                  setSelectedRegion('all');
                  setSearchQuery('');
                }}
              >
                Сбросить фильтры
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Listings */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-inter text-2xl font-semibold">
            {selectedTab === 'favorites' ? 'Избранные номера' : 'Рекомендуемые номера'}
            <span className="text-sm text-gray-500 ml-2">({filteredListings.length})</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              {listing.image && (
                <div className="relative h-48 bg-gray-100">
                  <img 
                    src={listing.image} 
                    alt={`${listing.number} ${listing.region}`}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className={`absolute top-2 right-2 p-2 ${favorites.includes(listing.id) ? 'bg-red-50 border-red-200' : 'bg-white/90'}`}
                    onClick={() => toggleFavorite(listing.id)}
                  >
                    <Icon 
                      name="Heart" 
                      size={16} 
                      className={favorites.includes(listing.id) ? 'text-red-500 fill-current' : 'text-gray-600'}
                    />
                  </Button>
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-inter text-xl flex items-center gap-2">
                    <div className="bg-white border-2 border-gray-800 px-3 py-1 rounded text-base font-bold">
                      {listing.number} {listing.region}
                    </div>
                  </CardTitle>
                  {listing.featured && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Icon name="Star" size={14} className="mr-1" />
                      VIP
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold text-primary">
                    {listing.price.toLocaleString()} ₽
                  </div>
                  <p className="font-opensans text-gray-600 text-sm">
                    {listing.description}
                  </p>
                  <Separator />
                  <div className="space-y-1 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Icon name="User" size={14} />
                      {listing.seller}
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Phone" size={14} />
                      {listing.phone}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" size="sm">
                      <Icon name="Phone" size={14} className="mr-1" />
                      Позвонить
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleFavorite(listing.id)}
                    >
                      <Icon 
                        name="Heart" 
                        size={14} 
                        className={favorites.includes(listing.id) ? 'text-red-500 fill-current' : ''}
                      />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="font-inter text-lg font-medium text-gray-900 mb-2">Номера не найдены</h3>
            <p className="font-opensans text-gray-500">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </div>
    </div>
  );

  const AddListingPage = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-inter text-3xl font-bold text-gray-900 mb-2">
          Добавить объявление
        </h2>
        <p className="font-opensans text-gray-600">
          Разместите информацию о продаже вашего номера
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-inter">Информация о номере</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="number">Номер автомобиля</Label>
                <Input
                  id="number"
                  placeholder="А123АА"
                  value={newListing.number}
                  onChange={(e) => setNewListing({...newListing, number: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="region">Код региона</Label>
                <Input
                  id="region"
                  placeholder="77"
                  value={newListing.region}
                  onChange={(e) => setNewListing({...newListing, region: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="price">Цена (₽)</Label>
              <Input
                id="price"
                type="number"
                placeholder="50000"
                value={newListing.price}
                onChange={(e) => setNewListing({...newListing, price: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="seller">Ваше имя</Label>
                <Input
                  id="seller"
                  placeholder="Иван Петров"
                  value={newListing.seller}
                  onChange={(e) => setNewListing({...newListing, seller: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  placeholder="+7 (999) 123-45-67"
                  value={newListing.phone}
                  onChange={(e) => setNewListing({...newListing, phone: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                placeholder="Расскажите о вашем номере..."
                value={newListing.description}
                onChange={(e) => setNewListing({...newListing, description: e.target.value})}
                className="min-h-20"
              />
            </div>

            <Button type="submit" className="w-full">
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить объявление
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  const RulesPage = () => (
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-white p-2 rounded-lg">
                <Icon name="Car" size={24} />
              </div>
              <div>
                <h1 className="font-inter font-bold text-xl text-gray-900">Номера.РФ</h1>
                <p className="font-opensans text-xs text-gray-500">Площадка номеров</p>
              </div>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Icon name="Phone" size={16} className="mr-1" />
                  Связаться
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Контакты</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 font-opensans">
                  <p>Телефон поддержки: +7 (800) 123-45-67</p>
                  <p>Email: support@номера.рф</p>
                  <p>Время работы: Пн-Пт 9:00-18:00</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-5 max-w-lg mx-auto lg:mx-0">
              <TabsTrigger value="home" className="flex items-center gap-2">
                <Icon name="Home" size={16} />
                Главная
              </TabsTrigger>
              <TabsTrigger value="search" className="flex items-center gap-2">
                <Icon name="Search" size={16} />
                Поиск
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex items-center gap-2">
                <Icon name="Heart" size={16} />
                Избранное
              </TabsTrigger>
              <TabsTrigger value="add" className="flex items-center gap-2">
                <Icon name="Plus" size={16} />
                Добавить
              </TabsTrigger>
              <TabsTrigger value="rules" className="flex items-center gap-2">
                <Icon name="FileText" size={16} />
                Правила
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={selectedTab}>
          <TabsContent value="home">
            <HomePage />
          </TabsContent>
          <TabsContent value="search">
            <HomePage />
          </TabsContent>
          <TabsContent value="favorites">
            <div className="space-y-8">
              <div className="text-center py-8">
                <Icon name="Heart" size={48} className="mx-auto text-red-300 mb-4" />
                <h1 className="font-inter text-3xl font-bold text-gray-900 mb-2">
                  Избранные номера
                </h1>
                <p className="font-opensans text-gray-600">
                  {favorites.length === 0 
                    ? 'Вы ещё не добавили номера в избранное'
                    : `У вас ${favorites.length} избранных номеров`}
                </p>
              </div>
              
              {favorites.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.filter(listing => favorites.includes(listing.id)).map((listing) => (
                    <Card key={listing.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                      {listing.image && (
                        <div className="relative h-48 bg-gray-100">
                          <img 
                            src={listing.image} 
                            alt={`${listing.number} ${listing.region}`}
                            className="w-full h-full object-cover"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2 p-2 bg-red-50 border-red-200"
                            onClick={() => toggleFavorite(listing.id)}
                          >
                            <Icon name="Heart" size={16} className="text-red-500 fill-current" />
                          </Button>
                        </div>
                      )}
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="font-inter text-xl flex items-center gap-2">
                            <div className="bg-white border-2 border-gray-800 px-3 py-1 rounded text-base font-bold">
                              {listing.number} {listing.region}
                            </div>
                          </CardTitle>
                          {listing.featured && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Icon name="Star" size={14} className="mr-1" />
                              VIP
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="text-2xl font-bold text-primary">
                            {listing.price.toLocaleString()} ₽
                          </div>
                          <p className="font-opensans text-gray-600 text-sm">
                            {listing.description}
                          </p>
                          <Separator />
                          <div className="space-y-1 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Icon name="User" size={14} />
                              {listing.seller}
                            </div>
                            <div className="flex items-center gap-2">
                              <Icon name="Phone" size={14} />
                              {listing.phone}
                            </div>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button className="flex-1" size="sm">
                              <Icon name="Phone" size={14} className="mr-1" />
                              Позвонить
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleFavorite(listing.id)}
                            >
                              <Icon name="Heart" size={14} className="text-red-500 fill-current" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="add">
            <AddListingPage />
          </TabsContent>
          <TabsContent value="rules">
            <RulesPage />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="font-opensans text-gray-400">
            © 2024 Номера.РФ - Площадка для покупки и продажи автомобильных номеров
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;