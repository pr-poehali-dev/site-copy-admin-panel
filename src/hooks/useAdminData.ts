import { useState, useEffect } from 'react';

export interface SiteData {
  hero: {
    title: string;
    subtitle: string;
    primaryButton: string;
    secondaryButton: string;
  };
  services: Array<{
    id: number;
    icon: string;
    title: string;
    description: string;
  }>;
  projects: Array<{
    id: number;
    title: string;
    description: string;
    image: string;
  }>;
  contacts: {
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
}

const defaultSiteData: SiteData = {
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
};

export const useAdminData = () => {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);

  // Загрузка данных из localStorage при инициализации
  useEffect(() => {
    const savedData = localStorage.getItem('siteData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setSiteData(parsedData);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    }
  }, []);

  // Сохранение данных в localStorage при изменении
  const saveSiteData = (newData: SiteData) => {
    setSiteData(newData);
    localStorage.setItem('siteData', JSON.stringify(newData));
  };

  const updateHero = (hero: SiteData['hero']) => {
    const newData = { ...siteData, hero };
    saveSiteData(newData);
  };

  const updateServices = (services: SiteData['services']) => {
    const newData = { ...siteData, services };
    saveSiteData(newData);
  };

  const updateProjects = (projects: SiteData['projects']) => {
    const newData = { ...siteData, projects };
    saveSiteData(newData);
  };

  const updateContacts = (contacts: SiteData['contacts']) => {
    const newData = { ...siteData, contacts };
    saveSiteData(newData);
  };

  const addProject = (project: Omit<SiteData['projects'][0], 'id'>) => {
    const newProject = {
      ...project,
      id: Date.now()
    };
    const newProjects = [...siteData.projects, newProject];
    updateProjects(newProjects);
  };

  const editProject = (projectId: number, updatedProject: Omit<SiteData['projects'][0], 'id'>) => {
    const newProjects = siteData.projects.map(project =>
      project.id === projectId ? { ...updatedProject, id: projectId } : project
    );
    updateProjects(newProjects);
  };

  const deleteProject = (projectId: number) => {
    const newProjects = siteData.projects.filter(project => project.id !== projectId);
    updateProjects(newProjects);
  };

  return {
    siteData,
    updateHero,
    updateServices,
    updateProjects,
    updateContacts,
    addProject,
    editProject,
    deleteProject
  };
};