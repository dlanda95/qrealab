// ============================================================
//  FOOTER — Interfaces
// ============================================================

export interface FooterSocialLink {
  label: string;
  url:   string;
}

export interface FooterLink {
  label: string;
  url:   string;
}

export interface FooterLinkColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterData {
  brandDescription: string;
  socialLinks:      FooterSocialLink[];
  linkColumns:      FooterLinkColumn[];
  contactTitle:     string;
  address:          string[];   // líneas separadas por \n en el CMS
  contactEmails:    string[];   // múltiples emails (nuevo)
  contactEmail:     string;     // legado — usar contactEmails cuando esté disponible
  copyrightText:    string;
}
