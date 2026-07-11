const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function IconShell({ children, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

export function LinkIcon({ className }) {
  return (
    <IconShell className={className}>
      <path {...stroke} d="M9 15l6-6" />
      <path {...stroke} d="M8.5 11.5l-1.8 1.8a3.2 3.2 0 104.5 4.5l1.8-1.8" />
      <path {...stroke} d="M15.5 12.5l1.8-1.8a3.2 3.2 0 10-4.5-4.5L11 7.9" />
    </IconShell>
  );
}

export function TextIcon({ className }) {
  return (
    <IconShell className={className}>
      <path {...stroke} d="M5 6h14" />
      <path {...stroke} d="M5 12h14" />
      <path {...stroke} d="M5 18h9" />
    </IconShell>
  );
}

export function EmailIcon({ className }) {
  return (
    <IconShell className={className}>
      <rect {...stroke} x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path {...stroke} d="M4 7l8 6 8-6" />
    </IconShell>
  );
}

export function CallIcon({ className }) {
  return (
    <IconShell className={className}>
      <path
        {...stroke}
        d="M8.2 4.8l2.1 2.1a1.4 1.4 0 010 2L9.1 10.1c.8 1.7 2.1 3 3.8 3.8l1.2-1.2a1.4 1.4 0 012 0l2.1 2.1a1.4 1.4 0 010 2l-1.1 1.1c-.7.7-1.7 1-2.7.8-2.5-.5-4.9-2-6.9-4s-3.5-4.4-4-6.9c-.2-1 .1-2 .8-2.7l1.1-1.1a1.4 1.4 0 012 0z"
      />
    </IconShell>
  );
}

export function SmsIcon({ className }) {
  return (
    <IconShell className={className}>
      <path
        {...stroke}
        d="M5 5.5h14a1.5 1.5 0 011.5 1.5v8a1.5 1.5 0 01-1.5 1.5H10l-4 3v-3H5A1.5 1.5 0 013.5 15V7A1.5 1.5 0 015 5.5z"
      />
      <path {...stroke} d="M8 10h8M8 13h5" />
    </IconShell>
  );
}

export function WifiIcon({ className }) {
  return (
    <IconShell className={className}>
      <path {...stroke} d="M5 10.2a9.5 9.5 0 0114 0" />
      <path {...stroke} d="M7.8 13a5.8 5.8 0 018.4 0" />
      <path {...stroke} d="M10.5 15.8a2.2 2.2 0 013 0" />
      <circle fill="currentColor" stroke="none" cx="12" cy="18.2" r="1.1" />
    </IconShell>
  );
}

export function WhatsAppIcon({ className }) {
  return (
    <IconShell className={className}>
      <path
        {...stroke}
        d="M12 4.5a7.5 7.5 0 00-6.4 11.4L4.8 19.2l3.4-.8A7.5 7.5 0 1012 4.5z"
      />
      <path
        {...stroke}
        d="M9.2 9.4c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.5l-.4.5c-.1.1-.1.3 0 .4.4.7 1.1 1.4 1.9 1.9.2.1.3.1.5 0l.5-.4c.2-.1.4-.2.5-.1l1.7.7c.3.1.4.3.4.5v.5c0 .2 0 .4-.4.6-.4.2-.9.4-1.4.4-2.3 0-5.1-2.3-6-4.4-.2-.5 0-1 .2-1.4z"
      />
    </IconShell>
  );
}

export function VcardIcon({ className }) {
  return (
    <IconShell className={className}>
      <rect {...stroke} x="3.5" y="6" width="17" height="12" rx="1.5" />
      <circle {...stroke} cx="9" cy="11" r="1.8" />
      <path {...stroke} d="M6.5 15.2c.4-1.2 1.3-1.8 2.5-1.8s2.1.6 2.5 1.8" />
      <path {...stroke} d="M14 10h4M14 13h4" />
    </IconShell>
  );
}

export const TYPE_ICONS = {
  link: LinkIcon,
  text: TextIcon,
  email: EmailIcon,
  call: CallIcon,
  sms: SmsIcon,
  wifi: WifiIcon,
  whatsapp: WhatsAppIcon,
  vcard: VcardIcon,
};
