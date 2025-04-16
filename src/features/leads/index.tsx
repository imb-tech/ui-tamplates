'use client'

import type React from 'react'
import { useState, useEffect, useRef, JSX } from 'react'
import {
  Search,
  Plus,
  User,
  Mail,
  Phone,
  FileText,
  CheckSquare,
  Filter,
  X,
  ChevronRight,
  Star,
  Calendar,
  Users,
  Clock,
  Video,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Menu,
  ArrowLeft,
} from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ThemeColorToggle } from '@/components/header/color-toggle'

type Lead = {
  id: number
  name: string
  address: string
  messages: number
  tasks: number
  notes: number
  connectTime: string
  category: string
  favorite: boolean
}

type Category = {
  id: string
  name: string
  icon: JSX.Element
  color: string
  bgColor: string
  count: number
}

type TLeadItem = {
  lead: Lead
  onLeadClick: (leadId: number) => void
  favorites: Record<number, boolean>
  toggleFavorite: (e: React.MouseEvent, leadId: number) => void
  getAvatarColor: (id: number) => string
  getCategoryById: (id: string) => Category
  index: number
}

// Categories data
const categories: Category[] = [
  {
    id: 'ready',
    name: 'Qatnashishga tayyor',
    icon: <CheckCircle className='h-4 w-4' />,
    color: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
    count: 8,
  },
  {
    id: 'scheduled',
    name: 'Suhbatga yozildi',
    icon: <Calendar className='h-4 w-4' />,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    count: 5,
  },
  {
    id: 'online',
    name: 'Online ishtirok etoladi',
    icon: <Video className='h-4 w-4' />,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    count: 12,
  },
  {
    id: 'pending',
    name: 'Kutilmoqda',
    icon: <Clock className='h-4 w-4' />,
    color: 'text-orange-500',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    count: 3,
  },
  {
    id: 'unavailable',
    name: 'Ishtirok etolmaydi',
    icon: <AlertCircle className='h-4 w-4' />,
    color: 'text-red-500',
    bgColor: 'bg-red-100 dark:bg-red-900/20',
    count: 2,
  },
  {
    id: 'unspecified',
    name: 'Aniqlanmagan',
    icon: <HelpCircle className='h-4 w-4' />,
    color: 'text-gray-500',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    count: 4,
  },
]

// Sample data for leads
const initialLeads: Lead[] = [
  {
    id: 1,
    name: 'Huy Minh Pham',
    address: 'Elm Street, San Diego, CA',
    messages: 1,
    tasks: 2,
    notes: 6,
    connectTime: '10min ago',
    category: 'ready',
    favorite: true,
  },
  {
    id: 2,
    name: 'Son Alex',
    address: 'Maple Drive, Riverside, CA',
    messages: 18,
    tasks: 1,
    notes: 5,
    connectTime: '30min ago',
    category: 'scheduled',
    favorite: false,
  },
  {
    id: 3,
    name: 'Aiden Anderson',
    address: 'Spruce Street, Denver, CO',
    messages: 17,
    tasks: 9,
    notes: 10,
    connectTime: '3d go',
    category: 'online',
    favorite: true,
  },
  {
    id: 4,
    name: 'Alex Thompson',
    address: 'Fir Lane, Glendale, AZ',
    messages: 6,
    tasks: 20,
    notes: 1,
    connectTime: '2m go',
    category: 'ready',
    favorite: false,
  },
  {
    id: 5,
    name: 'Alice Miller',
    address: 'Magnolia Court, Stockton, CA',
    messages: 11,
    tasks: 12,
    notes: 11,
    connectTime: '1w go',
    category: 'pending',
    favorite: false,
  },
  {
    id: 6,
    name: 'Amelia Martinez',
    address: 'Cypress Boulevard, Miami, FL',
    messages: 20,
    tasks: 2,
    notes: 16,
    connectTime: '3w go',
    category: 'online',
    favorite: true,
  },
  {
    id: 7,
    name: 'Anh Pham Bao',
    address: 'Larch Drive, Portland, OR',
    messages: 9,
    tasks: 14,
    notes: 7,
    connectTime: '5d go',
    category: 'scheduled',
    favorite: false,
  },
  {
    id: 8,
    name: 'Anh Le Thi',
    address: 'Poplar Road, Orlando, FL',
    messages: 16,
    tasks: 12,
    notes: 7,
    connectTime: '3d go',
    category: 'online',
    favorite: false,
  },
  {
    id: 9,
    name: 'Bao Vo Quoc',
    address: 'Willow Way, Seattle, WA',
    messages: 15,
    tasks: 3,
    notes: 7,
    connectTime: '4d go',
    category: 'unavailable',
    favorite: true,
  },
  {
    id: 10,
    name: 'Ben Anderson',
    address: 'Alder Lane, Minneapolis, MN',
    messages: 18,
    tasks: 4,
    notes: 19,
    connectTime: '3w go',
    category: 'unspecified',
    favorite: false,
  },
  {
    id: 11,
    name: 'Bethany Thompson',
    address: 'Chestnut Street, Richmond, VA',
    messages: 13,
    tasks: 2,
    notes: 5,
    connectTime: '2d go',
    category: 'ready',
    favorite: false,
  },
]

// Sample activities data
const activities = [
  {
    id: 1,
    type: 'form',
    title: 'Submitted a loan pre-approval form',
    date: '09/28/2024 08:45 AM',
    icon: <FileText className='h-4 w-4' />,
  },
  {
    id: 2,
    type: 'calculator',
    title: 'Used the mortgage calculator to explore options',
    date: '09/28/2024 09:00 AM',
    details: {
      loanAmount: '$350,000',
      interestRate: '4.5%',
      loanTerm: '30 years',
      monthlyPayment: '$1,773.00',
      totalInterestPaid: '$267,260.00',
      actions: [
        'Saved results for reference',
        'Requested a follow-up from a loan officer',
      ],
    },
    icon: <CheckSquare className='h-4 w-4' />,
  },
  {
    id: 3,
    type: 'email',
    title: 'Opened a personalized mortgage rate email',
    date: '09/28/2024 09:15 AM',
    icon: <Mail className='h-4 w-4' />,
  },
  {
    id: 4,
    type: 'call',
    title: 'Scheduled a call with a loan officer',
    date: '09/29/2024 10:30 AM',
    icon: <Phone className='h-4 w-4' />,
  },
  {
    id: 5,
    type: 'email',
    title: 'Sent an email to loan officer with questions about rates',
    date: '09/29/2024 11:00 AM',
    icon: <Mail className='h-4 w-4' />,
  },
  {
    id: 6,
    type: 'email',
    title: 'Opened a follow-up email about mortgage terms 5 times',
    date: '09/30/2024 02:30 PM',
    icon: <Mail className='h-4 w-4' />,
  },
  {
    id: 7,
    type: 'document',
    title: 'Uploaded financial documents for verification',
    date: '10/01/2024 09:10 AM',
    icon: <FileText className='h-4 w-4' />,
  },
]

// Sample messages data
const messages = [
  {
    id: 1,
    sender: 'System',
    content: 'Lead created',
    date: '09/27/2024 10:15 AM',
  },
  {
    id: 2,
    sender: 'John Smith',
    content: 'Sent welcome email with mortgage options',
    date: '09/27/2024 10:30 AM',
  },
  {
    id: 3,
    sender: 'Lead',
    content: 'Replied with interest in 30-year fixed rate',
    date: '09/27/2024 11:45 AM',
  },
  {
    id: 4,
    sender: 'John Smith',
    content: 'Scheduled initial consultation call',
    date: '09/27/2024 01:30 PM',
  },
]

// Sample status history
const statusHistory = [
  {
    id: 1,
    status: 'New Lead',
    date: '09/27/2024 10:15 AM',
    user: 'System',
  },
  {
    id: 2,
    status: 'Contacted',
    date: '09/27/2024 10:30 AM',
    user: 'John Smith',
  },
  {
    id: 3,
    status: 'Engaged',
    date: '09/28/2024 09:00 AM',
    user: 'System',
  },
  {
    id: 4,
    status: 'Qualified',
    date: '09/30/2024 02:30 PM',
    user: 'Sarah Johnson',
  },
]

// Sample comments
const comments = [
  {
    id: 1,
    user: 'John Smith',
    content: 'Lead shows strong interest in refinancing options',
    date: '09/28/2024 11:30 AM',
  },
  {
    id: 2,
    user: 'Sarah Johnson',
    content: 'Verified employment and income details',
    date: '09/29/2024 02:15 PM',
  },
  {
    id: 3,
    user: 'Michael Brown',
    content: 'Discussed down payment options and pre-approval process',
    date: '09/30/2024 10:45 AM',
  },
]

// Color themes for avatars
const avatarColors = [
  'bg-pink-500/20 text-pink-500',
  'bg-purple-500/20 text-purple-500',
  'bg-indigo-500/20 text-indigo-500',
  'bg-blue-500/20 text-blue-500',
  'bg-cyan-500/20 text-cyan-500',
  'bg-teal-500/20 text-teal-500',
  'bg-green-500/20 text-green-500',
  'bg-yellow-500/20 text-yellow-500',
  'bg-orange-500/20 text-orange-500',
  'bg-red-500/20 text-red-500',
]

// Lead item component
const LeadItem = ({
  lead,
  onLeadClick,
  favorites,
  toggleFavorite,
  getAvatarColor,
  getCategoryById,
}: TLeadItem) => {
  return (
    <div
      key={lead.id}
      className='flex cursor-pointer items-center justify-between border-b p-4 transition-colors duration-200 hover:bg-muted/50'
      onClick={() => onLeadClick(lead.id)}
      draggable
    >
      <div className='flex items-center gap-3'>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${getAvatarColor(lead.id)}`}
        >
          <User className='h-5 w-5' />
        </div>
        <div>
          <div className='flex items-center gap-2 font-medium'>
            {lead.name}
            <Button
              variant='ghost'
              size='icon'
              className='h-6 w-6 p-0'
              onClick={(e) => toggleFavorite(e, lead.id)}
            >
              <Star
                className={`h-4 w-4 transition-colors duration-200 ${
                  favorites[lead.id]
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground'
                }`}
              />
            </Button>
          </div>
          <div className='text-sm text-muted-foreground'>{lead.address}</div>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Badge
          variant='outline'
          className={`${getCategoryById(lead.category).color} text-xs`}
        >
          {getCategoryById(lead.category).name}
        </Badge>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                <span>{lead.messages}</span>
                <Mail className='h-4 w-4' />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{lead.messages} xabarlar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                <span>{lead.tasks}</span>
                <CheckSquare className='h-4 w-4' />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{lead.tasks} vazifalar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

export default function LeadsPage() {
  const [leads] = useState([...initialLeads])
  const [selectedLead, setSelectedLead] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddAnimation, setShowAddAnimation] = useState(false)
  const [favorites, setFavorites] = useState<Record<number, boolean>>(() => {
    const initialFavorites: Record<number, boolean> = {}
    initialLeads.forEach((lead) => {
      initialFavorites[lead.id] = lead.favorite
    })
    return initialFavorites
  })
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const [activeTab, setActiveTab] = useState('activities')
  const [mobileView, setMobileView] = useState<
    'categories' | 'leads' | 'details'
  >('leads')

  const detailsRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  // Handle lead click
  const handleLeadClick = (leadId: number) => {
    setSelectedLead(leadId)
    setDetailsOpen(true)
    if (isMobile) {
      setMobileView('details')
    }
  }

  // Handle category click
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId)
    if (isMobile) {
      setMobileView('leads')
    }
  }

  // Toggle favorite status
  const toggleFavorite = (e: React.MouseEvent, leadId: number) => {
    e.stopPropagation()
    setFavorites((prev) => {
      const newFavorites = { ...prev }
      newFavorites[leadId] = !newFavorites[leadId]
      return newFavorites
    })
  }

  // Filter leads by category, favorites, and search query
  const filteredLeads = leads
    .filter((lead) =>
      selectedCategory ? lead.category === selectedCategory : true
    )
    .filter((lead) => (showOnlyFavorites ? favorites[lead.id] : true))
    .filter(
      (lead) =>
        searchQuery === '' ||
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.address.toLowerCase().includes(searchQuery.toLowerCase())
    )

  // Close details panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node) &&
        detailsOpen &&
        !isMobile
      ) {
        setDetailsOpen(false)
      }
    }

    // document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [detailsOpen, isMobile])

  // Animation for add button
  const handleAddButtonClick = () => {
    setShowAddAnimation(true)
    setTimeout(() => setShowAddAnimation(false), 500)
  }

  // Get avatar color based on lead id
  const getAvatarColor = (id: number) => {
    return avatarColors[id % avatarColors.length]
  }

  // Get category by id
  const getCategoryById = (id: string) => {
    return (
      categories.find((cat) => cat.id === id) ||
      categories[categories.length - 1]
    )
  }

  // Handle back button in mobile view
  const handleMobileBack = () => {
    if (mobileView === 'details') {
      setMobileView('leads')
    } else if (mobileView === 'leads') {
      setMobileView('categories')
    }
  }

  return (
    <div className='flex h-screen flex-col bg-background text-foreground'>
      <header className='flex h-16 items-center justify-between border-b bg-background px-4 md:px-6'>
        <div className='flex items-center gap-4'>
          {isMobile && mobileView !== 'categories' && (
            <Button
              variant='ghost'
              size='icon'
              onClick={handleMobileBack}
              className='mr-1'
            >
              <ArrowLeft className='h-5 w-5' />
            </Button>
          )}

          <div className='flex items-center gap-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground'>
              <Users className='h-4 w-4' />
            </div>
            <h1 className='text-xl font-semibold'>
              {isMobile
                ? mobileView === 'categories'
                  ? 'Kategoriyalar'
                  : mobileView === 'details'
                    ? 'Tafsilotlar'
                    : 'Ishtirokchilar'
                : 'Ishtirokchilar'}
            </h1>
          </div>
        </div>
        <div className='flex items-center gap-2 md:gap-4'>
          {!isMobile && (
            <div className='relative'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Qidirish...'
                className='w-64 border-primary/20 pl-8 transition-colors duration-200 focus-visible:border-primary'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant='ghost'
                  size='icon'
                  className='absolute right-1 top-1 h-7 w-7'
                  onClick={() => setSearchQuery('')}
                >
                  <X className='h-3 w-3' />
                </Button>
              )}
            </div>
          )}

          {isMobile && mobileView === 'leads' && (
            <Button
              variant='outline'
              size='icon'
              onClick={() => setMobileView('categories')}
            >
              <Menu className='h-5 w-5' />
            </Button>
          )}

          {(!isMobile || mobileView === 'leads') && (
            <Button
              size='sm'
              onClick={handleAddButtonClick}
              className={`bg-primary hover:bg-primary/90 ${showAddAnimation ? 'animate-pulse' : ''}`}
            >
              <Plus className='mr-2 h-4 w-4' />
              {isMobile ? '' : "Qo'shish"}
            </Button>
          )}

          <ThemeColorToggle />
        </div>
      </header>

      {isMobile && mobileView === 'leads' && (
        <div className='border-b p-2'>
          <Input
            type='search'
            placeholder='Qidirish...'
            className='w-full border-primary/20 transition-colors duration-200 focus-visible:border-primary'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            // prefix={<Search className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
      )}

      <div className='flex flex-1 overflow-hidden'>
        {/* Left sidebar - Categories */}
        {(!isMobile || mobileView === 'categories') && (
          <div
            className={`${isMobile ? 'w-full' : 'w-[40%] max-w-[300px]'} overflow-auto border-r`}
          >
            <div className='border-b p-4'>
              <h2 className='mb-4 text-sm font-medium uppercase text-muted-foreground'>
                Kategoriyalar
              </h2>
              <div className='space-y-2'>
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`flex cursor-pointer items-center justify-between rounded-md p-3 transition-colors duration-200 ${
                      selectedCategory === category.id
                        ? `${category.bgColor} ${category.color}`
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div className='flex items-center gap-3'>
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${category.bgColor}`}
                      >
                        {category.icon}
                      </div>
                      <span className='font-medium'>{category.name}</span>
                    </div>
                    <Badge variant='outline' className='ml-2'>
                      {category.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Middle section - User list */}
        {(!isMobile || mobileView === 'leads') && (
          <div className='flex-1 overflow-auto border-r'>
            <div className='flex items-center justify-between border-b p-4'>
              <div className='flex items-center gap-2'>
                <h2 className='font-medium'>
                  {selectedCategory
                    ? getCategoryById(selectedCategory).name
                    : 'Barcha ishtirokchilar'}
                </h2>
                <Badge variant='outline' className='ml-2'>
                  {filteredLeads.length}
                </Badge>
              </div>

              <div className='flex items-center gap-2'>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={showOnlyFavorites ? 'default' : 'outline'}
                        size='sm'
                        className='h-8 px-3'
                        onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                      >
                        <Star
                          className={`h-4 w-4 ${showOnlyFavorites ? 'fill-yellow-300 text-yellow-300' : ''}`}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {showOnlyFavorites
                          ? "Barchasini ko'rsatish"
                          : "Faqat sevimlilarni ko'rsatish"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' size='sm' className='h-8'>
                      <Filter className='mr-2 h-4 w-4' />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                      Barcha kategoriyalar
                    </DropdownMenuItem>
                    {categories.map((category) => (
                      <DropdownMenuItem
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <div className={`mr-2 ${category.color}`}>
                          {category.icon}
                        </div>
                        {category.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div>
              {selectedCategory && (
                <div className='flex items-center p-4'>
                  <Badge
                    variant='outline'
                    className={`mr-2 ${getCategoryById(selectedCategory).color}`}
                  >
                    <span className='mr-1'>
                      {getCategoryById(selectedCategory).icon}
                    </span>
                    {getCategoryById(selectedCategory).name}
                  </Badge>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setSelectedCategory(null)}
                    className='h-6 text-xs'
                  >
                    Filterni tozalash
                  </Button>
                </div>
              )}

              {filteredLeads.length === 0 ? (
                <div className='flex flex-col items-center justify-center p-8 text-center'>
                  <Search className='mb-2 h-10 w-10 text-muted-foreground' />
                  <h3 className='text-lg font-medium'>
                    Ishtirokchilar topilmadi
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Qidiruv yoki filter parametrlarini o'zgartiring
                  </p>
                  <Button
                    variant='outline'
                    size='sm'
                    className='mt-4'
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory(null)
                      setShowOnlyFavorites(false)
                    }}
                  >
                    Filtrlarni tozalash
                  </Button>
                </div>
              ) : (
                <div>
                  <div>
                    {filteredLeads.map((lead, index) => (
                      <LeadItem
                        key={lead.id}
                        lead={lead}
                        onLeadClick={handleLeadClick}
                        favorites={favorites}
                        toggleFavorite={toggleFavorite}
                        getAvatarColor={getAvatarColor}
                        getCategoryById={getCategoryById}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Right section - Details */}
        <div>
          {detailsOpen &&
            selectedLead &&
            (!isMobile || mobileView === 'details') && (
              <div
                className={`${isMobile ? 'w-full' : 'w-[450px]'} overflow-auto border-l`}
                ref={detailsRef}
              >
                <div className='flex items-center justify-between border-b p-4'>
                  <h2 className='font-medium'>Ishtirokchi ma'lumotlari</h2>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => {
                      setDetailsOpen(false)
                      if (isMobile) setMobileView('leads')
                    }}
                    className='h-7 text-xs'
                  >
                    <X className='mr-1 h-3 w-3' />
                    Yopish
                  </Button>
                </div>

                <div className='border-b p-4'>
                  <div className='mb-3 flex items-center gap-3'>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${getAvatarColor(selectedLead)}`}
                    >
                      <User className='h-6 w-6' />
                    </div>
                    <div>
                      <div className='flex items-center gap-2 text-lg font-medium'>
                        {leads.find((l) => l.id === selectedLead)?.name}
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-6 w-6 p-0'
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(e, selectedLead)
                          }}
                        >
                          <Star
                            className={`h-4 w-4 transition-colors duration-200 ${
                              favorites[selectedLead]
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground'
                            }`}
                          />
                        </Button>
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        {leads.find((l) => l.id === selectedLead)?.address}
                      </div>
                    </div>
                  </div>

                  <div className='mb-4 mt-3'>
                    <Badge
                      className={`${getCategoryById(leads.find((l) => l.id === selectedLead)?.category || '').bgColor} ${getCategoryById(leads.find((l) => l.id === selectedLead)?.category || '').color}`}
                    >
                      <span className='mr-1'>
                        {
                          getCategoryById(
                            leads.find((l) => l.id === selectedLead)
                              ?.category || ''
                          ).icon
                        }
                      </span>
                      {
                        getCategoryById(
                          leads.find((l) => l.id === selectedLead)?.category ||
                            ''
                        ).name
                      }
                    </Badge>
                  </div>

                  <div className='mt-4 grid grid-cols-3 gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      className='flex items-center justify-center gap-1'
                    >
                      <Mail className='h-4 w-4' />
                      <span>Xabar</span>
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      className='flex items-center justify-center gap-1'
                    >
                      <Phone className='h-4 w-4' />
                      <span>Qo'ng'iroq</span>
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      className='flex items-center justify-center gap-1'
                    >
                      <Calendar className='h-4 w-4' />
                      <span>Jadval</span>
                    </Button>
                  </div>
                </div>

                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className='w-full'
                >
                  <div className='border-b px-4'>
                    <TabsList className='grid w-full grid-cols-4'>
                      <TabsTrigger value='activities' className='relative'>
                        Faoliyat
                        <div
                          className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-transform duration-200 ${activeTab === 'activities' ? 'scale-x-100' : 'scale-x-0'}`}
                        />
                      </TabsTrigger>
                      <TabsTrigger value='messages' className='relative'>
                        Xabarlar
                        <div
                          className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-transform duration-200 ${activeTab === 'messages' ? 'scale-x-100' : 'scale-x-0'}`}
                        />
                      </TabsTrigger>
                      <TabsTrigger value='comments' className='relative'>
                        Izohlar
                        <div
                          className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-transform duration-200 ${activeTab === 'comments' ? 'scale-x-100' : 'scale-x-0'}`}
                        />
                      </TabsTrigger>
                      <TabsTrigger value='status' className='relative'>
                        Status
                        <div
                          className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-transform duration-200 ${activeTab === 'status' ? 'scale-x-100' : 'scale-x-0'}`}
                        />
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value='activities' className='p-0'>
                    <div>
                      <div key='activities'>
                        {activities.map((activity) => (
                          <div key={activity.id} className='border-b p-4'>
                            <div className='mb-1 flex items-center gap-2'>
                              <div className='flex h-6 w-6 items-center justify-center rounded-full bg-primary/10'>
                                {activity.icon}
                              </div>
                              <div className='font-medium'>
                                {activity.title}
                              </div>
                            </div>
                            <div className='text-sm text-muted-foreground'>
                              {activity.date}
                            </div>

                            {activity.type === 'calculator' &&
                              activity.details && (
                                <div className='mt-3'>
                                  <Card className='p-3'>
                                    <div className='grid grid-cols-3 gap-2 text-sm'>
                                      <div>
                                        <div className='text-muted-foreground'>
                                          Loan Amount
                                        </div>
                                        <div>{activity.details.loanAmount}</div>
                                      </div>
                                      <div>
                                        <div className='text-muted-foreground'>
                                          Interest Rate
                                        </div>
                                        <div>
                                          {activity.details.interestRate}
                                        </div>
                                      </div>
                                      <div>
                                        <div className='text-muted-foreground'>
                                          Loan Term
                                        </div>
                                        <div>{activity.details.loanTerm}</div>
                                      </div>
                                      <div>
                                        <div className='text-muted-foreground'>
                                          Monthly Payment
                                        </div>
                                        <div>
                                          {activity.details.monthlyPayment}
                                        </div>
                                      </div>
                                      <div className='col-span-2'>
                                        <div className='text-muted-foreground'>
                                          Total Interest Paid
                                        </div>
                                        <div>
                                          {activity.details.totalInterestPaid}
                                        </div>
                                      </div>
                                      <div className='col-span-3 mt-2'>
                                        <div className='text-muted-foreground'>
                                          User Actions Taken
                                        </div>
                                        {activity.details.actions.map(
                                          (action, index) => (
                                            <div key={index}>- {action}</div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </Card>
                                </div>
                              )}
                          </div>
                        ))}
                        <div className='flex justify-center p-4'>
                          <Button variant='outline' size='sm' className='group'>
                            Ko'proq ko'rsatish
                            <ChevronRight className='ml-1 h-3 w-3 transition-transform duration-200 group-hover:translate-x-1' />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value='messages' className='p-0'>
                    <div>
                      <div key='messages'>
                        {messages.map((message) => (
                          <div key={message.id} className='border-b p-4'>
                            <div className='mb-1 flex items-center gap-2'>
                              <Avatar className='h-6 w-6'>
                                <User className='h-4 w-4' />
                              </Avatar>
                              <div className='font-medium'>
                                {message.sender}
                              </div>
                              <div className='text-xs text-muted-foreground'>
                                {message.date}
                              </div>
                            </div>
                            <div className='text-sm'>{message.content}</div>
                          </div>
                        ))}
                        <div className='p-4'>
                          <Button
                            variant='outline'
                            size='sm'
                            className='w-full'
                          >
                            Yangi xabar yuborish
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value='comments' className='p-0'>
                    <div>
                      <div key='comments'>
                        {comments.map((comment) => (
                          <div key={comment.id} className='border-b p-4'>
                            <div className='mb-1 flex items-center gap-2'>
                              <Avatar className='h-6 w-6'>
                                <User className='h-4 w-4' />
                              </Avatar>
                              <div className='font-medium'>{comment.user}</div>
                              <div className='text-xs text-muted-foreground'>
                                {comment.date}
                              </div>
                            </div>
                            <div className='text-sm'>{comment.content}</div>
                          </div>
                        ))}
                        <div className='p-4'>
                          <Button
                            variant='outline'
                            size='sm'
                            className='w-full'
                          >
                            Izoh qo'shish
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value='status' className='p-0'>
                    <div>
                      <div key='status'>
                        {statusHistory.map((status) => (
                          <div key={status.id} className='border-b p-4'>
                            <div className='mb-1 flex items-center gap-2'>
                              <Badge variant='outline' className='font-normal'>
                                {status.status}
                              </Badge>
                              <div className='text-xs text-muted-foreground'>
                                {status.date}
                              </div>
                            </div>
                            <div className='text-sm'>
                              O'zgartirdi: {status.user}
                            </div>
                          </div>
                        ))}
                        <div className='p-4'>
                          <Button
                            variant='outline'
                            size='sm'
                            className='w-full'
                          >
                            Statusni yangilash
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}
