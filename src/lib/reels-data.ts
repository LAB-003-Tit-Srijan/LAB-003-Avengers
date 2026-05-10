export interface Reel {
  id: string;
  videoUrl: string;
  product: {
    id: string;
    name: string;
    price: string;
    category: string;
    campus: string;
  };
  seller: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  likes: number;
  isLiked?: boolean;
}

export const REELS_DATA: Reel[] = [
  {
    id: "reel-1",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-girl-in-a-skirt-running-on-the-grass-39887-large.mp4",
    product: {
      id: "sneakers-1",
      name: "Nike Air Zoom Sneakers",
      price: "₹4,500",
      category: "Fashion",
      campus: "IIT Delhi",
    },
    seller: {
      name: "Priya S.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      isVerified: true,
    },
    likes: 124,
  },
  {
    id: "reel-2",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-young-man-sitting-on-a-bench-and-using-his-laptop-4485-large.mp4",
    product: {
      id: "laptop-1",
      name: "MacBook Air M1 2020",
      price: "₹52,000",
      category: "Electronics",
      campus: "DTU Delhi",
    },
    seller: {
      name: "Rahul M.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
      isVerified: true,
    },
    likes: 850,
  },
  {
    id: "reel-3",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-at-the-office-4481-large.mp4",
    product: {
      id: "monitor-1",
      name: "Dell 27-inch 4K Monitor",
      price: "₹18,500",
      category: "Electronics",
      campus: "NSUT Delhi",
    },
    seller: {
      name: "Amit S.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
      isVerified: true,
    },
    likes: 432,
  },
  {
    id: "reel-4",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-unboxing-a-new-mobile-phone-41221-large.mp4",
    product: {
      id: "phone-1",
      name: "iPhone 15 Pro Max",
      price: "₹1,10,000",
      category: "Mobile Phones",
      campus: "IIT Bombay",
    },
    seller: {
      name: "Vikram R.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
      isVerified: true,
    },
    likes: 1205,
  },
  {
    id: "reel-5",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-student-reading-in-the-university-library-4355-large.mp4",
    product: {
      id: "book-1",
      name: "Quantum Mechanics Vol 1",
      price: "₹650",
      category: "Books",
      campus: "IISc Bangalore",
    },
    seller: {
      name: "Sanya G.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sanya",
      isVerified: true,
    },
    likes: 243,
  },
  {
    id: "reel-6",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-coffee-cup-on-top-of-a-table-3298-large.mp4",
    product: {
      id: "hostel-1",
      name: "Hostel Coffee Machine",
      price: "₹2,100",
      category: "Hostel Essentials",
      campus: "NIT Trichy",
    },
    seller: {
      name: "Karthik V.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik",
      isVerified: true,
    },
    likes: 567,
  },
];
