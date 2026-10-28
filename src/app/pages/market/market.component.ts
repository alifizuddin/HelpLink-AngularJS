import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MarketService } from '../../services/market.service';

interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  seller?: string;
  sellerIcon?: string;
  badge?: string;
  impact?: string;
  impactType?: 'income' | 'training';
  stock?: string;
  id?: string;
  createdAt?: string;
  status?: string;
}

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  defaultProducts: Product[] = [
    {
      name: 'Beaded Bracelet',
      description:
        'Handmade bracelet crafted with colorful beads by local youth artisans in vocational community programs.',
      price: 15,
      image:
        'https://inkalloy.com/cdn/shop/files/sage-confetti-beaded-10-strand-stretch-bracelets-multicolor-sbbr0900ms-44715547689153.jpg?v=1740085075',
      category: 'Handmade Jewelry',
      seller: 'Local Youth Artisans',
      sellerIcon: 'workspace_premium',
      badge: 'Youth Workshop',
      impact: 'Direct Micro-Income',
      impactType: 'income',
      stock: 'In Stock'
    },
    {
      name: 'Woven Bag',
      description:
        'Eco-friendly woven bag made from durable recycled materials, designed for daily groceries and lifestyle use.',
      price: 40,
      image:
        'https://fayecreations.com/cdn/shop/files/smoky-blue-opal-leather-woven-tote-bag-front-view_7ad95601-f2ad-43cc-bcd8-c38222394aeb.jpg?v=1781788851&width=1946',
      category: 'Bags & Accessories',
      seller: 'Green Weavers Collective',
      sellerIcon: 'eco',
      badge: 'Recycled Materials',
      impact: 'Funds Skill Training',
      impactType: 'training',
      stock: 'In Stock'
    },
    {
      name: 'Hand-Painted Mug',
      description:
        'Ceramic mug hand-painted with intricate patterns by women artisans transitioning out of shelter programs.',
      price: 25,
      image:
        'https://eastfork.com/cdn/shop/files/501-007-MU-EG-PNTGB-2.jpg?v=1792612389&width=500',
      category: 'Home & Living',
      seller: 'Women Artisan Collective',
      sellerIcon: 'palette',
      badge: 'Hand-Painted',
      impact: 'Supports Shelter Transition',
      impactType: 'income',
      stock: '12 Available'
    },
    {
      name: 'Recycled Soap Set',
      description:
        'Set of 4 handmade soaps made from upcycled hotel soap, cleaned and repurposed by refugee women.',
      price: 20,
      image:
        'https://sapocycle.org/wp-content/uploads/2021/12/Screen-Shot-2021-12-21-at-15.18.10.png',
      category: 'Hygiene & Wellness',
      seller: 'Refugee Soap Project',
      sellerIcon: 'clean_hands',
      badge: 'Upcycled',
      impact: 'Direct Micro-Income',
      impactType: 'income',
      stock: '8 Available'
    },
    {
      name: 'Woven Basket',
      description:
        'Traditional handwoven basket made from sustainable palm leaves by indigenous artisan families.',
      price: 45,
      image:
        'https://erp-image.sgliteasset.com/_next/image?url=https%3A%2F%2Fcdn1.sgliteasset.com%2Fshiokcol%2Fimages%2Fproduct%2Fproduct-4770147%2FvWUHKgcY67639589254d4_1734579593.jpeg&w=3840&q=85',
      category: 'Home & Living',
      seller: 'Indigenous Weavers Guild',
      sellerIcon: 'grass',
      badge: 'Traditional Craft',
      impact: 'Preserves Cultural Heritage',
      impactType: 'income',
      stock: 'In Stock'
    },
    {
      name: 'Knitted Scarf',
      description:
        'Soft wool scarf knitted by elderly community members, providing purpose and income for seniors.',
      price: 30,
      image:
        'https://contents.mediadecathlon.com/m25965131/k$8c18a0621ca6b5e8f1da1c69708dc692/mountain-warehouse-mens-mirka-knitted-scarf-mountain-warehouse-e81f58fb-387a-4663-89bb-20866b7f554b.jpg',
      category: 'Bags & Accessories',
      seller: 'Senior Knitting Circle',
      sellerIcon: 'checkroom',
      badge: 'Hand-Knitted',
      impact: 'Senior Community Support',
      impactType: 'income',
      stock: '15 Available'
    },
    {
      name: 'Natural Tea Blend',
      description:
        'Locally sourced herbal tea blend created by youth learning about sustainable agriculture.',
      price: 18,
      image:
        'https://go-organic.com.au/wp-content/uploads/2022/05/Healthy-Self-Tea-Small_Jar.jpg',
      category: 'Pantry & Food Essentials',
      seller: 'Youth Farm Initiative',
      sellerIcon: 'local_florist',
      badge: 'Herbal',
      impact: 'Funds Youth Agriculture',
      impactType: 'training',
      stock: 'In Stock'
    },
    {
      name: 'Wooden Coasters',
      description:
        'Set of 6 coasters hand-carved from reclaimed wood by individuals rebuilding their lives after addiction recovery.',
      price: 22,
      image:
        'https://bsgifts.com.my/wp-content/uploads/2026/07/2-BSGIFTS-Hexagon-Wooden-Coaster-11-cm-H-%C3%97-9.5-cm-L.png',
      category: 'Home & Living',
      seller: 'Recovery Woodworks',
      sellerIcon: 'carpenter',
      badge: 'Reclaimed Wood',
      impact: 'Supports Recovery Programs',
      impactType: 'income',
      stock: '6 Available'
    },
    {
      name: 'Scented Candle',
      description:
        'Natural soy wax candle with calming lavender scent, hand-poured by women in domestic violence shelters.',
      price: 28,
      image:
        'https://ssfhome.com/wp-content/uploads/2026/06/DSCCDKHN251101.jpg',
      category: 'Home & Living',
      seller: 'Hope Candle Collective',
      sellerIcon: 'candle',
      badge: 'Natural Soy',
      impact: 'Supports DV Survivors',
      impactType: 'income',
      stock: '20 Available'
    }
  ];

  products: Product[] = [];

  categories: string[] = [
    'Handmade Jewelry',
    'Bags & Accessories',
    'Home & Living',
    'Pantry & Food Essentials',
    'Hygiene & Wellness'
  ];

  newProduct = {
    name: '',
    category: this.categories[0],
    description: '',
    price: 0,
    stock: 0,
    image: ''
  };

  selectedProduct: any = null;

  isLoadingProducts = false;
  isAddingProduct = false;
  isPurchasing = false;
  productStatus: 'idle' | 'success' | 'error' = 'idle';
  productMessage = '';
  purchaseStatus: 'idle' | 'success' | 'error' = 'idle';
  purchaseMessage = '';

  showModal = false;
  modalTitle = '';
  modalMessage = '';
  modalType: 'success' | 'error' | 'info' = 'success';

  constructor(private marketService: MarketService) {
    this.products = [...this.defaultProducts];
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  openModal(title: string, message: string, type: 'success' | 'error' | 'info' = 'success'): void {
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalType = type;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  loadProducts(): void {
    this.isLoadingProducts = true;
    this.marketService.getProducts().subscribe({
      next: (storedProducts) => {
        this.isLoadingProducts = false;
        const approvedProducts = storedProducts.filter(
          (product) => product.status?.toLowerCase() !== 'pending_review'
        );
        this.products = [...approvedProducts, ...this.defaultProducts];
      },
      error: (error) => {
        this.isLoadingProducts = false;
        // Keep defaults on error
        this.products = [...this.defaultProducts];
      }
    });
  }

  handleImageUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.newProduct.image = reader.result as string;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  addProduct() {
    this.productStatus = 'idle';
    this.productMessage = '';

    if (
      !this.newProduct.name ||
      !this.newProduct.description ||
      !this.newProduct.price ||
      !this.newProduct.image
    ) {
      this.openModal('Validation Error', 'Please fill in all required fields and upload an image.', 'error');
      return;
    }

    this.isAddingProduct = true;
    const productToAdd: Product = {
      name: this.newProduct.name,
      description: this.newProduct.description,
      price: Number(this.newProduct.price),
      image: this.newProduct.image,
      category: this.newProduct.category,
      seller: 'Community Artisan',
      sellerIcon: 'storefront',
      badge: this.newProduct.category,
      impact: 'Direct Micro-Income',
      impactType: 'income',
      stock: Number(this.newProduct.stock) > 0 ? `${this.newProduct.stock} Available` : 'In Stock'
    };

    this.marketService.addProduct(productToAdd).subscribe({
      next: (response) => {
        this.isAddingProduct = false;
        this.productStatus = 'success';
        this.productMessage = 'Product submitted for review successfully! It will be visible after review.';
        this.openModal('Product Submitted', this.productMessage, 'success');
        this.newProduct = {
          name: '',
          category: this.categories[0],
          description: '',
          price: 0,
          stock: 0,
          image: ''
        };
      },
      error: (error) => {
        this.isAddingProduct = false;
        this.productStatus = 'error';
        this.productMessage = 'Failed to submit product. Please try again.';
        this.openModal('Submission Failed', this.productMessage, 'error');
      }
    });
  }

  openProduct(product: any) {
    this.selectedProduct = product;
    this.purchaseStatus = 'idle';
    this.purchaseMessage = '';
  }

  closeProduct() {
    this.selectedProduct = null;
  }

  buyProduct() {
    if (!this.selectedProduct) return;
    
    this.purchaseStatus = 'idle';
    this.purchaseMessage = '';
    this.isPurchasing = true;

    const purchase = {
      productId: this.selectedProduct.id || this.selectedProduct.name,
      productName: this.selectedProduct.name,
      price: this.selectedProduct.price
    };

    this.marketService.purchaseProduct(purchase).subscribe({
      next: (response) => {
        this.isPurchasing = false;
        this.purchaseStatus = 'success';
        this.purchaseMessage = `You have purchased "${this.selectedProduct.name}" for RM ${this.selectedProduct.price}. Thank you for supporting the community!`;
        this.closeProduct();
        this.openModal('Purchase Confirmed', this.purchaseMessage, 'success');
      },
      error: (error) => {
        this.isPurchasing = false;
        this.purchaseStatus = 'error';
        this.purchaseMessage = 'Failed to process purchase. Please try again.';
        this.closeProduct();
        this.openModal('Purchase Failed', this.purchaseMessage, 'error');
      }
    });
  }
}
