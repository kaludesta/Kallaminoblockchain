
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Event, TeamMember, BlogPost, Resource, GalleryImage, MembershipSubmission, Partner } from '../types';
import { initialEvents, initialTeamMembers, initialBlogPosts, initialResources, initialGalleryImages, initialSubmissions, initialPartners } from '../data/mockData';

interface DataContextType {
  events: Event[];
  teamMembers: TeamMember[];
  blogPosts: BlogPost[];
  resources: Resource[];
  galleryImages: GalleryImage[];
  submissions: MembershipSubmission[];
  partners: Partner[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: number) => void;
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: number) => void;
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (member: TeamMember) => void;
  deleteTeamMember: (id: number) => void;
  addResource: (resource: Omit<Resource, 'id'>) => void;
  updateResource: (resource: Resource) => void;
  deleteResource: (id: number) => void;
  addSubmission: (submission: Omit<MembershipSubmission, 'id' | 'date'>) => void;
  deleteSubmission: (id: number) => void;
  addPartner: (partner: Omit<Partner, 'id'>) => void;
  updatePartner: (partner: Partner) => void;
  deletePartner: (id: number) => void;
  addGalleryImage: (image: Omit<GalleryImage, 'id'>) => void;
  deleteGalleryImage: (id: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialGalleryImages);
  const [submissions, setSubmissions] = useState<MembershipSubmission[]>(initialSubmissions);
  const [partners, setPartners] = useState<Partner[]>(initialPartners);


  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: Date.now() };
    setEvents(prev => [newEvent, ...prev]);
  };
  const updateEvent = (updatedEvent: Event) => {
    setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };
  const deleteEvent = (id: number) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost = { ...post, id: Date.now() };
    setBlogPosts(prev => [newPost, ...prev]);
  };
  const updateBlogPost = (updatedPost: BlogPost) => {
    setBlogPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
  };
  const deleteBlogPost = (id: number) => {
    setBlogPosts(prev => prev.filter(p => p.id !== id));
  };
  
  const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const newMember = { ...member, id: Date.now() };
    setTeamMembers(prev => [...prev, newMember]);
  };
  const updateTeamMember = (updatedMember: TeamMember) => {
    setTeamMembers(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
  };
  const deleteTeamMember = (id: number) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));
  };

  const addResource = (resource: Omit<Resource, 'id'>) => {
    const newResource = { ...resource, id: Date.now() };
    setResources(prev => [newResource, ...prev]);
  };
  const updateResource = (updatedResource: Resource) => {
    setResources(prev => prev.map(r => r.id === updatedResource.id ? updatedResource : r));
  };
  const deleteResource = (id: number) => {
    setResources(prev => prev.filter(r => r.id !== id));
  };

  const addSubmission = (submission: Omit<MembershipSubmission, 'id' | 'date'>) => {
    const newSubmission = { ...submission, id: Date.now(), date: new Date().toISOString() };
    setSubmissions(prev => [newSubmission, ...prev]);
  };
  const deleteSubmission = (id: number) => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
  };

  const addPartner = (partner: Omit<Partner, 'id'>) => {
    const newPartner = { ...partner, id: Date.now() };
    setPartners(prev => [newPartner, ...prev]);
  };
  const updatePartner = (updatedPartner: Partner) => {
    setPartners(prev => prev.map(p => p.id === updatedPartner.id ? updatedPartner : p));
  };
  const deletePartner = (id: number) => {
    setPartners(prev => prev.filter(p => p.id !== id));
  };

  const addGalleryImage = (image: Omit<GalleryImage, 'id'>) => {
    const newImage = { ...image, id: Date.now() };
    setGalleryImages(prev => [newImage, ...prev]);
  };
  const deleteGalleryImage = (id: number) => {
    setGalleryImages(prev => prev.filter(img => img.id !== id));
  };


  return (
    <DataContext.Provider value={{
      events, teamMembers, blogPosts, resources, galleryImages, submissions, partners,
      addEvent, updateEvent, deleteEvent,
      addBlogPost, updateBlogPost, deleteBlogPost,
      addTeamMember, updateTeamMember, deleteTeamMember,
      addResource, updateResource, deleteResource,
      addSubmission, deleteSubmission,
      addPartner, updatePartner, deletePartner,
      addGalleryImage, deleteGalleryImage
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
