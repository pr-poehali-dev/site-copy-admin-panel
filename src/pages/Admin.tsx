import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [editingProject, setEditingProject] = useState<any>(null);
  
  // Данные сайта (в реальном приложении это будет в базе данных)
  const [siteData, setSiteData] = useState({
    hero: {
      title: 'Профессиональные системы вентиляции',
      subtitle: 'Проектирование, поставка и монтаж приточно-вытяжных систем для жилых и коммерческих объектов',
      primaryButton: 'Заказать проект',
      secondaryButton: 'Наши работы'
    },
    services: [
      {
        id: 1,
        icon: 'Wind',
        title: 'Проектирование',
        description: 'Разработка проектов вентиляционных систем с учетом особенностей объекта'
      },
      {
        id: 2,
        icon: 'Wrench',
        title: 'Монтаж',
        description: 'Профессиональная установка систем приточно-вытяжной вентиляции'
      },
      {
        id: 3,
        icon: 'Settings',
        title: 'Обслуживание',
        description: 'Регулярное техническое обслуживание и ремонт вентиляционных систем'
      }
    ],
    projects: [
      {
        id: 1,
        title: 'Офисный комплекс',
        description: 'Приточно-вытяжная система для бизнес-центра',
        image: '/img/14b933e9-c212-40c3-875d-0a77d65af59f.jpg'
      },
      {
        id: 2,
        title: 'Производственный цех',
        description: 'Промышленная вентиляция с очисткой воздуха',
        image: '/img/3ccbc4b0-c120-4c71-a852-12a212982ff1.jpg'
      },
      {
        id: 3,
        title: 'Торговый центр',
        description: 'Комплексная система кондиционирования',
        image: '/img/0be65fd3-ce51-44de-b920-e2b31ac3a283.jpg'
      }
    ],
    contacts: {
      phone: '+7 (495) 123-45-67',
      email: 'info@ventsystems.ru',
      address: 'г. Москва, ул. Промышленная, 123',
      hours: 'Пн-Пт: 9:00-18:00'
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Простая проверка (в реальном приложении нужна настоящая авторизация)
    if (loginData.username === 'admin' && loginData.password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Неверный логин или пароль');
    }
  };

  const handleSaveContent = (section: string, data: any) => {
    setSiteData(prev => ({
      ...prev,
      [section]: data
    }));
    alert('Изменения сохранены!');
  };

  const handleAddProject = (projectData: any) => {
    const newProject = {
      ...projectData,
      id: Date.now()
    };
    setSiteData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
    setEditingProject(null);
  };

  const handleEditProject = (projectData: any) => {
    setSiteData(prev => ({
      ...prev,
      projects: prev.projects.map(p => 
        p.id === projectData.id ? projectData : p
      )
    }));
    setEditingProject(null);
  };

  const handleDeleteProject = (projectId: number) => {
    if (confirm('Удалить проект?')) {
      setSiteData(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== projectId)
      }));
    }
  };

  // Форма авторизации
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Вход в админ-панель</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Логин</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="admin"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="admin"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Админ-панель
  return (
    <div className="min-h-screen bg-gray-100 font-open-sans">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-[#2563EB]">Админ-панель</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => window.open('/', '_blank')}>
                <Icon name="ExternalLink" className="w-4 h-4 mr-2" />
                Просмотр сайта
              </Button>
              <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
                <Icon name="LogOut" className="w-4 h-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content">Контент</TabsTrigger>
            <TabsTrigger value="projects">Проекты</TabsTrigger>
            <TabsTrigger value="contacts">Контакты</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          {/* Редактирование контента */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Главный блок</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="hero-title">Заголовок</Label>
                  <Input
                    id="hero-title"
                    value={siteData.hero.title}
                    onChange={(e) => setSiteData(prev => ({
                      ...prev,
                      hero: { ...prev.hero, title: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="hero-subtitle">Подзаголовок</Label>
                  <Textarea
                    id="hero-subtitle"
                    value={siteData.hero.subtitle}
                    onChange={(e) => setSiteData(prev => ({
                      ...prev,
                      hero: { ...prev.hero, subtitle: e.target.value }
                    }))}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primary-button">Основная кнопка</Label>
                    <Input
                      id="primary-button"
                      value={siteData.hero.primaryButton}
                      onChange={(e) => setSiteData(prev => ({
                        ...prev,
                        hero: { ...prev.hero, primaryButton: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondary-button">Дополнительная кнопка</Label>
                    <Input
                      id="secondary-button"
                      value={siteData.hero.secondaryButton}
                      onChange={(e) => setSiteData(prev => ({
                        ...prev,
                        hero: { ...prev.hero, secondaryButton: e.target.value }
                      }))}
                    />
                  </div>
                </div>
                <Button onClick={() => handleSaveContent('hero', siteData.hero)}>
                  Сохранить изменения
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Услуги</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {siteData.services.map((service, index) => (
                    <div key={service.id} className="border rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Название</Label>
                          <Input
                            value={service.title}
                            onChange={(e) => {
                              const newServices = [...siteData.services];
                              newServices[index] = { ...service, title: e.target.value };
                              setSiteData(prev => ({ ...prev, services: newServices }));
                            }}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Описание</Label>
                          <Textarea
                            value={service.description}
                            onChange={(e) => {
                              const newServices = [...siteData.services];
                              newServices[index] = { ...service, description: e.target.value };
                              setSiteData(prev => ({ ...prev, services: newServices }));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="mt-4" onClick={() => handleSaveContent('services', siteData.services)}>
                  Сохранить изменения
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Управление проектами */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Управление проектами</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Icon name="Plus" className="w-4 h-4 mr-2" />
                    Добавить проект
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Новый проект</DialogTitle>
                  </DialogHeader>
                  <ProjectForm onSubmit={handleAddProject} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {siteData.projects.map((project) => (
                <Card key={project.id}>
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Icon name="Edit" className="w-4 h-4 mr-2" />
                            Изменить
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Редактировать проект</DialogTitle>
                          </DialogHeader>
                          <ProjectForm project={project} onSubmit={handleEditProject} />
                        </DialogContent>
                      </Dialog>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Icon name="Trash2" className="w-4 h-4 mr-2" />
                        Удалить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Контакты */}
          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Контактная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      value={siteData.contacts.phone}
                      onChange={(e) => setSiteData(prev => ({
                        ...prev,
                        contacts: { ...prev.contacts, phone: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={siteData.contacts.email}
                      onChange={(e) => setSiteData(prev => ({
                        ...prev,
                        contacts: { ...prev.contacts, email: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Адрес</Label>
                    <Input
                      id="address"
                      value={siteData.contacts.address}
                      onChange={(e) => setSiteData(prev => ({
                        ...prev,
                        contacts: { ...prev.contacts, address: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hours">Время работы</Label>
                    <Input
                      id="hours"
                      value={siteData.contacts.hours}
                      onChange={(e) => setSiteData(prev => ({
                        ...prev,
                        contacts: { ...prev.contacts, hours: e.target.value }
                      }))}
                    />
                  </div>
                </div>
                <Button onClick={() => handleSaveContent('contacts', siteData.contacts)}>
                  Сохранить изменения
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Настройки */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Настройки сайта</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Название компании</Label>
                    <Input defaultValue="ВентСистемы" />
                  </div>
                  <div>
                    <Label>Логотип</Label>
                    <Input type="file" accept="image/*" />
                  </div>
                  <div>
                    <Label>Цвет темы</Label>
                    <Input type="color" defaultValue="#2563EB" />
                  </div>
                  <div>
                    <Label>Язык сайта</Label>
                    <select className="w-full px-3 py-2 border rounded-md">
                      <option>Русский</option>
                      <option>English</option>
                    </select>
                  </div>
                </div>
                <Button>Сохранить настройки</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// Компонент формы проекта
const ProjectForm = ({ project, onSubmit }: { project?: any; onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    image: project?.image || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(project ? { ...formData, id: project.id } : formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Название проекта</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="image">URL изображения</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
          placeholder="/img/example.jpg"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        {project ? 'Сохранить изменения' : 'Добавить проект'}
      </Button>
    </form>
  );
};

export default Admin;