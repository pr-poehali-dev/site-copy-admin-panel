import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useAdminData } from '@/hooks/useAdminData';

const Index = () => {
  const { siteData } = useAdminData();
  
  return (
    <div className="min-h-screen bg-white font-open-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#2563EB]">ВентСистемы</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-900 hover:text-[#2563EB] transition-colors">Главная</a>
              <a href="#works" className="text-gray-900 hover:text-[#2563EB] transition-colors">Наши работы</a>
              <a href="#products" className="text-gray-900 hover:text-[#2563EB] transition-colors">Продукция</a>
              <a href="#services" className="text-gray-900 hover:text-[#2563EB] transition-colors">Услуги</a>
              <a href="#contacts" className="text-gray-900 hover:text-[#2563EB] transition-colors">Контакты</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white">
                Консультация
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/admin'} className="border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white">
                <Icon name="Settings" className="w-4 h-4 mr-2" />
                Админ
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
          <img src="/img/0be65fd3-ce51-44de-b920-e2b31ac3a283.jpg" alt="Ventilation building" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-6 font-inter">{siteData.hero.title}</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              {siteData.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-[#2563EB] hover:bg-gray-100">
                {siteData.hero.primaryButton}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#2563EB]">
                {siteData.hero.secondaryButton}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Наши услуги</h2>
            <p className="text-xl text-gray-600">Полный спектр работ по вентиляционным системам</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#2563EB] rounded-lg flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Works Section */}
      <section id="works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Наши работы</h2>
            <p className="text-xl text-gray-600">Примеры выполненных проектов</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.projects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products & Certificates Section */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Продукция и сертификаты</h2>
            <p className="text-xl text-gray-600">Качественное оборудование от ведущих производителей</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Products */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Оборудование</h3>
              <div className="space-y-4">
                {[
                  "Приточно-вытяжные установки",
                  "Вентиляторы промышленные",
                  "Фильтры и очистители воздуха",
                  "Воздуховоды и фитинги",
                  "Автоматика и управление"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#2563EB] rounded-full"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Сертификаты</h3>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((cert) => (
                  <Card key={cert} className="p-4 text-center hover:shadow-md transition-shadow">
                    <Icon name="Award" className="h-8 w-8 text-[#2563EB] mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Сертификат {cert}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacts" className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-xl text-gray-300">Получите бесплатную консультацию</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Оставить заявку</h3>
              <form className="space-y-4">
                <Input 
                  placeholder="Ваше имя" 
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Input 
                  type="email" 
                  placeholder="Email" 
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Input 
                  type="tel" 
                  placeholder="Телефон" 
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Textarea 
                  placeholder="Сообщение" 
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8]">
                  Отправить заявку
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Контактная информация</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" className="h-5 w-5 text-[#2563EB]" />
                  <span>{siteData.contacts.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" className="h-5 w-5 text-[#2563EB]" />
                  <span>{siteData.contacts.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" className="h-5 w-5 text-[#2563EB]" />
                  <span>{siteData.contacts.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" className="h-5 w-5 text-[#2563EB]" />
                  <span>{siteData.contacts.hours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">© 2024 ВентСистемы. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;