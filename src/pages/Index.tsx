import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

// Import components
import { LicensePlate } from '@/components/types';
import ListingCard from '@/components/ListingCard';
import FiltersPanel from '@/components/FiltersPanel';
import DetailModal from '@/components/DetailModal';
import AddListingForm from '@/components/AddListingForm';
import RulesPage from '@/components/RulesPage';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('home');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('date-desc');
  const [selectedListing, setSelectedListing] = useState<LicensePlate | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  
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
      image: '/img/7728926c-b245-4a22-907a-b3342e6e0cdc.jpg',
      dateAdded: '2024-08-19',
      views: 127,
      category: 'premium'
    },
    {
      id: '2',
      number: 'О001ОО',
      region: '177',
      price: 120000,
      seller: 'Мария Сидорова',
      phone: '+7 (999) 234-56-78',
      description: 'Эксклюзивный номер для коллекционера',
      image: '/img/8553e8db-4c4e-4788-a4dc-17bd7f082212.jpg',
      dateAdded: '2024-08-18',
      views: 89,
      category: 'exclusive'
    },
    {
      id: '3',
      number: 'Н333НН',
      region: '199',
      price: 35000,
      seller: 'Алексей Иванов',
      phone: '+7 (999) 345-67-89',
      description: 'Хороший номер по доступной цене',
      image: '/img/357e84cf-736c-4206-9690-3b17f8b5f99d.jpg',
      dateAdded: '2024-08-17',
      views: 56,
      category: 'standard'
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

  // Notification system
  useEffect(() => {
    const checkForNewListings = () => {
      const newNotifications: string[] = [];
      listings.forEach(listing => {
        const addedDate = new Date(listing.dateAdded);
        const now = new Date();
        const hoursDiff = (now.getTime() - addedDate.getTime()) / (1000 * 3600);
        
        if (hoursDiff <= 24) {
          newNotifications.push(`Новый номер ${listing.number} ${listing.region} за ${listing.price.toLocaleString()} ₽`);
        }
      });
      setNotifications(newNotifications);
    };
    
    checkForNewListings();
  }, [listings]);

  const getSortedListings = (listings: LicensePlate[]) => {
    const sorted = [...listings];
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'date-asc':
        return sorted.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
      case 'date-desc':
        return sorted.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      case 'views-desc':
        return sorted.sort((a, b) => (b.views || 0) - (a.views || 0));
      default:
        return sorted;
    }
  };

  const filteredListings = getSortedListings(
    listings.filter(listing => {
      const matchesSearch = listing.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           listing.region.includes(searchQuery);
      const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1];
      const matchesRegion = selectedRegion === 'all' || listing.region === selectedRegion;
      
      return matchesSearch && matchesPrice && matchesRegion;
    })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Новое объявление:', newListing);
    setNotifications(prev => [
      `Новое объявление ${newListing.number} ${newListing.region} добавлено успешно!`,
      ...prev
    ]);
    setNewListing({
      number: '',
      region: '',
      price: '',
      seller: '',
      phone: '',
      description: ''
    });
  };

  const openDetailModal = (listing: LicensePlate) => {
    setSelectedListing(listing);
  };

  const closeDetailModal = () => {
    setSelectedListing(null);
  };

  const handleResetFilters = () => {
    setPriceRange([0, 500000]);
    setSelectedRegion('all');
    setSearchQuery('');
    setSortBy('date-desc');
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
        
        <FiltersPanel
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          notifications={notifications}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          sortBy={sortBy}
          setSortBy={setSortBy}
          regions={regions}
          onResetFilters={handleResetFilters}
        />
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
            <ListingCard
              key={listing.id}
              listing={listing}
              isFavorite={favorites.includes(listing.id)}
              onToggleFavorite={toggleFavorite}
              onOpenDetail={openDetailModal}
            />
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

  const FavoritesPage = () => (
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
            <ListingCard
              key={listing.id}
              listing={listing}
              isFavorite={true}
              onToggleFavorite={toggleFavorite}
              onOpenDetail={openDetailModal}
            />
          ))}
        </div>
      )}
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
            <FavoritesPage />
          </TabsContent>
          <TabsContent value="add">
            <AddListingForm
              newListing={newListing}
              setNewListing={setNewListing}
              onSubmit={handleSubmit}
            />
          </TabsContent>
          <TabsContent value="rules">
            <RulesPage />
          </TabsContent>
        </Tabs>
      </main>

      {/* Detail Modal */}
      <DetailModal
        listing={selectedListing}
        isOpen={!!selectedListing}
        onClose={closeDetailModal}
        isFavorite={selectedListing ? favorites.includes(selectedListing.id) : false}
        onToggleFavorite={toggleFavorite}
      />

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