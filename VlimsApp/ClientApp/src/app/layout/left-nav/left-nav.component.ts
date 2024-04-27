import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

export interface NavItem {
  label: string;
  path: string;
  isOpen: boolean;
  children: NavItem[] | null;
  isActive: boolean;
  iconClass: string;
}

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss'],
})
export class LeftNavComponent {
  isLeftNavCollapsed = false;
  selectedNavitem: any = null;
  label: string = '';

  navItems: NavItem[] = [
    {
      label: 'Home',
      path: '/home',
      isOpen: false,
      children: null,
      isActive: false,
      iconClass: 'bi bi-house-door',
    },
    // {
    //   label: 'Dashboard',
    //   path: '/dashboard',
    //   isOpen: false,
    //   children: null,
    //   isActive: false,
    //   iconClass: 'fa-solid fa-chart-pie',
    // },
    {
      label: 'Work Assigned to Me',
      path: '/assigned',
      isOpen: false,
      children: null,
      isActive: false,
      iconClass: 'bi bi-pencil-square',
    },
    {
      label: 'Document Master',
      path: '',
      isOpen: false,
      isActive: false,
      iconClass: 'bi bi-palette2',
      children: [
        {
          label: 'Document Type Configuration',
          path: '/document-types',
          isOpen: false,
          children: null,
          isActive: false,
          iconClass: '',
        },
        {
          label: 'Template Configuration',
          path: '/templates',
          isOpen: false,
          children: null,
          isActive: false,
          iconClass: '',
        },
        {
          label: 'Workflow Configuration',
          path: '/workflow',
          isOpen: false,
          children: null,
          isActive: false,
          iconClass: '',
        },
        // {
        //   label: 'Notification Configuration',
        //   path: '/docMaster',
        //   isOpen: false,
        //   children: null,
        //   isActive: false,
        //   iconClass: '',
        // },
        // {
        //   label: 'Dashboard Configuration',
        //   path: '/docMaster',
        //   isOpen: false,
        //   children: null,
        //   isActive: false,
        //   iconClass: '',
        // },
      ],
    },
    {
      label: 'Document Manager',
      path: '',
      isOpen: false,
      isActive: false,
      iconClass: 'bi bi-ui-checks-grid',
      children: [
        {
          label: 'Document Request',
          path: '/requests',
          isOpen: false,
          children: null,
          isActive: false,
          iconClass: '',
        },
        {
          label: 'Document Preparation',
          path: '/preparations',
          isOpen: false,
          children: null,
          isActive: false,
          iconClass: '',
        },
        {
          label: 'Document Effective',
          path: '/effectives',
          isOpen: false,
          children: null,
          isActive: false,
          iconClass: '',
        },
        {
          label: 'Document Repository',
          path: 'revision',
          isOpen: false,
          children: null,
          isActive: false,
          iconClass: '',
        },
        {
          label: 'Document Print',
          path: 'print',
          isOpen: false,
          children: null,
          isActive: false,
          iconClass: '',
        },
        {
          label: 'Existing Document Request',
          path: 'existingdoc',
          isOpen: false,
          children: null,
          isActive: false,
          iconClass: '',
        }
      ],
    },
    // {
    //   label: 'Document Repository',
    //   path: '/docRepo',
    //   isOpen: false,
    //   isActive: false,
    //   iconClass: 'bi bi-database-up',
    //   children: [
    //     {
    //       label: 'Document Types',
    //       path: '/docRepo',
    //       isOpen: false,
    //       children: null,
    //       isActive: false,
    //       iconClass: '',
    //     },
    //     {
    //       label: 'Template Configuration',
    //       path: '/docRepo',
    //       isOpen: false,
    //       children: null,
    //       isActive: false,
    //       iconClass: '',
    //     },
    //     {
    //       label: 'Workflow Configuration',
    //       path: '/docRepo',
    //       isOpen: false,
    //       children: null,
    //       isActive: false,
    //       iconClass: '',
    //     },
    //     {
    //       label: 'Notification Configuration',
    //       path: '/docRepo',
    //       isOpen: false,
    //       children: null,
    //       isActive: false,
    //       iconClass: '',
    //     },
    //     {
    //       label: 'Dashboard Configuration',
    //       path: '/docRepo',
    //       isOpen: false,
    //       children: null,
    //       isActive: false,
    //       iconClass: '',
    //     },
    //   ],
    // },
    {
      label: 'Admin Management',
      path: '',
      isOpen: false,
      isActive: false,
      iconClass: 'bi bi-gear-wide-connected',
      children: [
       
        {
          label: 'Security Management',
          path: 'securityM',
          isOpen: false,
          children: null,
          isActive: false,
          iconClass: ''
        },
        {
          label: 'Department Configuration',
          path: 'departments',
          isOpen: false,
          children: null,
          isActive: false,
          iconClass: ''
        },
        {
          label: 'Role Configuration',
          path: 'role',
          isOpen: false,
          children: null,
          isActive: false,
          iconClass: ''
         
        },
        {
          label: 'Set Functional Profile',
          path: 'SetFprofile',
          isOpen: false,
          children: null,
          isActive: false,
          iconClass: ''
          
        },
        {
          label: 'Plant Management',
          path: 'plant',
          isOpen: false,
          children: null,
          isActive: false,
          iconClass: ''
          
        },
        {
          label: 'User Configuration',
          path: 'userconfig',
          isOpen: false,
          children: null,
          isActive: false,
          iconClass: ''
          
        },
        {
          label: 'Active or Deactivate Users',
          path: 'activeconfig',
          isOpen: false,
          children: null,
          isActive: false,
          iconClass: ''
          
        }
        // Add more child items as needed
      ]
    },

    {
      label: 'Reports',
      path: '',
      isOpen: false,
      isActive: false,
      iconClass: 'bi bi-ui-checks-grid',
      children: [
        //{
        //  label: 'Document Type Index',
        //  path: '/doctypeindex',
        //  isOpen: false,
        //  children: null,
        //  isActive: false,
        //  iconClass: '',
        //},
        {
          label: 'Documents Index',
          path: 'docindex',
          isOpen: false,
          children: null,
          isActive: false,
          iconClass: '',
        },
        //{
        //  label: 'Document Print List',
        //  path: '/docprintindex',
        //  isOpen: false,
        //  children: null,
        //  isActive: false,
        //  iconClass: '',
        //}
      ],
    }
    
  ];

  toggleLeftNav() {
    this.isLeftNavCollapsed = !this.isLeftNavCollapsed;
  }

  constructor(private router: Router) {
    // Subscribe to router events to update active state on route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveState(event.urlAfterRedirects, this.navItems);
      }
    });
  }

  toggleNavItem(item: any): void {
    if (item.path) this.router.navigate([item.path]);
    else if (!item.path && item.children) {
      item.isOpen = !item.isOpen; // Toggle the open state of the item
    }
  }

  updateActiveState(route: string, items: any[]): void {
    for (const item of items) {
      if (item.path && item.path === route) {
        item.isActive = true; // Set the current item as active if its route matches the current route
        item.isOpen = true;
        this.openParentItems(item);
      } else {
        item.isActive = false; // Set other items as inactive
      }
      // Recursively check children for active state
      if (item.children && item.children.length > 0) {
        this.updateActiveState(route, item.children);
      }
    }
  }

  openParentItems(item: any): void {
    if (item && item.parent) {
      item.isOpen = true; // Open the current item
      this.openParentItems(item.parent); // Recursively open the parent item
    }
  }
}
