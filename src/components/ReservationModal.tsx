import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Calendar, Clock, Users, Download, Copy, Check, Mail, MessageSquare, ExternalLink, Send } from 'lucide-react';
import { ReservationData } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedExperience?: string;
  preselectedDate?: string;
  preselectedGuests?: string;
  isLightMode: boolean;
}

// Custom luxury WhatsApp icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Format phone number to international WhatsApp format
const cleanWhatsAppNumber = (phoneStr: string): string => {
  const digits = phoneStr.replace(/\D/g, '');
  if (digits.startsWith('0') && digits.length === 11) {
    return '234' + digits.slice(1);
  }
  if (digits.startsWith('234')) {
    return digits;
  }
  if (digits.length === 10) {
    return '234' + digits;
  }
  return digits || '2348135475432';
};

// Generate formatted WhatsApp message pass
const createWhatsAppMessage = (res: ReservationData): string => {
  return [
    `👑 *ADÙN VICTORIA ISLAND — RESERVATION PASS* 👑`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `Dear *${res.guestName}*, your reservation has been confirmed:`,
    ``,
    `🔖 *Reference Pass:* ${res.referenceCode}`,
    `🏛 *Experience:* ${res.experience}`,
    `📅 *Date:* ${res.date}`,
    `⏰ *Seating Time:* ${res.time}`,
    `👥 *Party Size:* ${res.guests}`,
    `🥂 *Occasion:* ${res.occasion}`,
    res.notes ? `📝 *Special Notes:* ${res.notes}` : '',
    ``,
    `📍 *Sanctuary:* Plot 14B Sinari Daranijo St, Victoria Island, Lagos`,
    `🌿 *Cuisine & Cellar:* Strictly 100% Halal certified & alcohol-free botanical reserve.`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `Host Concierge Desk: +234 813 547 5432`,
    `Adùn Victoria Island, Lagos, Nigeria`,
  ].filter(Boolean).join('\n');
};

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  preselectedExperience,
  preselectedDate,
  preselectedGuests,
  isLightMode,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');

  // Form State
  const [experience, setExperience] = useState("Chef's Table (Front Row Culinary Theatre)");
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('7:30 PM (Prime Dinner)');
  const [guests, setGuests] = useState('2 Guests (Intimate Table)');
  const [occasion, setOccasion] = useState('Chef Tasting Journey');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  // Confirmation Delivery Preference: 'whatsapp' | 'email' | 'both'
  const [confirmationChannel, setConfirmationChannel] = useState<'whatsapp' | 'email' | 'both'>('whatsapp');

  // Confirmation Record
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSentStatus, setEmailSentStatus] = useState<boolean>(false);

  useEffect(() => {
    if (preselectedExperience) {
      if (preselectedExperience.toLowerCase().includes('chef')) {
        setExperience("Chef's Table (Front Row Culinary Theatre)");
      } else if (preselectedExperience.toLowerCase().includes('rooftop') || preselectedExperience.toLowerCase().includes('terrace')) {
        setExperience('Sunset Rooftop & Vinyl Lounge');
      } else if (preselectedExperience.toLowerCase().includes('oba') || preselectedExperience.toLowerCase().includes('private')) {
        setExperience('Salon Ọba (Private Sovereign Salon)');
      } else {
        setExperience('Main Obsidian Dining Salon');
      }
    }
    if (preselectedDate) setDate(preselectedDate);
    if (preselectedGuests) {
      if (preselectedGuests.includes('2')) setGuests('2 Guests (Intimate Table)');
      else if (preselectedGuests.includes('4')) setGuests('4 Guests (Social Table)');
      else if (preselectedGuests.includes('6')) setGuests('6 Guests (Celebration)');
      else setGuests(preselectedGuests);
    }
  }, [preselectedExperience, preselectedDate, preselectedGuests, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const randomCode = 'ADUN-' + Math.floor(1000 + Math.random() * 9000);
    const reservationRecord: ReservationData = {
      referenceCode: randomCode,
      experience,
      date,
      time,
      guests,
      occasion,
      guestName: name.trim() || 'Valued Guest',
      guestPhone: phone.trim(),
      guestEmail: email.trim(),
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
      confirmationChannel,
    };

    const cleanedPhone = cleanWhatsAppNumber(phone);
    const channelLabel =
      confirmationChannel === 'whatsapp'
        ? 'WhatsApp Message'
        : confirmationChannel === 'email'
        ? 'Email Confirmation'
        : 'Both WhatsApp & Email';

    // Dispatch to restaurant owner's FormSubmit endpoint, while configuring guest CC/autoresponse if email requested
    try {
      const payload: Record<string, string> = {
        _subject: `New Adùn Reservation [${randomCode}] - ${name.trim() || 'Valued Guest'} (${guests}) [Deliver via ${channelLabel}]`,
        _template: 'table',
        _captcha: 'false',
        'Reference Code': randomCode,
        'Guest Name': name.trim() || 'Valued Guest',
        'Guest Phone / WhatsApp': phone.trim(),
        'Guest Email': email.trim() || 'Not provided',
        'Guest Preferred Confirmation Channel': channelLabel,
        'Experience / Salon': experience,
        'Reservation Date': date,
        'Seating Time': time,
        'Party Size': guests,
        'Occasion': occasion,
        'Dietary Allergies & Special Notes': notes.trim() || 'None specified',
        'Host 1-Click WhatsApp Guest Reply': `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(
          `Hello ${name.trim() || 'Guest'}, your reservation [${randomCode}] at Adùn Victoria Island is confirmed for ${date} at ${time}. We look forward to hosting you.`
        )}`,
        'Submitted At': new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' }) + ' (WAT)',
      };

      // If user selected Email or Both, CC the user and trigger FormSubmit autoresponse
      if (email.trim() && (confirmationChannel === 'email' || confirmationChannel === 'both')) {
        payload['_cc'] = email.trim();
        payload['_replyto'] = email.trim();
        payload['_autoresponse'] =
          `Dear ${name.trim() || 'Valued Guest'},\n\n` +
          `Your dining reservation at Adùn Victoria Island has been confirmed.\n\n` +
          `Reservation Reference: ${randomCode}\n` +
          `Experience / Salon: ${experience}\n` +
          `Date: ${date}\n` +
          `Time: ${time}\n` +
          `Party: ${guests}\n` +
          `Occasion: ${occasion}\n\n` +
          `Sanctuary: Plot 14B Sinari Daranijo St, Victoria Island, Lagos\n` +
          `Host Desk: +234 813 547 5432\n\n` +
          `Note: All cuisine, meats, and beverages at Adùn are strictly 100% Halal certified and alcohol-free.\n\n` +
          `We look forward to welcoming you.\nAdùn Victoria Island Hospitality`;
        setEmailSentStatus(true);
      } else {
        setEmailSentStatus(false);
      }

      await fetch('https://formsubmit.co/ajax/32056367a847e46a95ba48aca22f7755', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.warn('FormSubmit transmission notice:', error);
    } finally {
      setIsSubmitting(false);
      setConfirmedReservation(reservationRecord);
      setStep('success');
    }
  };

  const handleCopyCode = () => {
    if (confirmedReservation) {
      navigator.clipboard.writeText(confirmedReservation.referenceCode);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2500);
    }
  };

  const handleDownloadCalendar = () => {
    if (!confirmedReservation) return;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Adùn Victoria Island//Reservation Pass//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Dinner Reservation at Adùn (${confirmedReservation.experience})`,
      `DESCRIPTION:Reservation Reference: ${confirmedReservation.referenceCode}\\nGuests: ${confirmedReservation.guests}\\nHost Desk: +234 813 547 5432`,
      'LOCATION:Plot 14B Sinari Daranijo St, Victoria Island, Lagos, Nigeria',
      `DTSTART:${confirmedReservation.date.replace(/-/g, '')}T180000Z`,
      `DTEND:${confirmedReservation.date.replace(/-/g, '')}T210000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Adùn-Reservation-${confirmedReservation.referenceCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetAndClose = () => {
    setStep('form');
    onClose();
  };

  // WhatsApp pass URL for guest
  const guestWhatsAppUrl = confirmedReservation
    ? `https://wa.me/${cleanWhatsAppNumber(confirmedReservation.guestPhone)}?text=${encodeURIComponent(
        createWhatsAppMessage(confirmedReservation)
      )}`
    : '';

  // Host concierge direct WhatsApp desk
  const conciergeWhatsAppUrl = confirmedReservation
    ? `https://wa.me/2348135475432?text=${encodeURIComponent(
        `Hello Adùn Host Concierge, I just booked reference [${confirmedReservation.referenceCode}] for ${confirmedReservation.guestName} (${confirmedReservation.guests}) on ${confirmedReservation.date} at ${confirmedReservation.time}.`
      )}`
    : '';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C1410]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div
        className={`relative w-full max-w-xl rounded-2xl sm:rounded-3xl border p-4 sm:p-6 md:p-8 shadow-2xl transition-colors max-h-[92vh] overflow-y-auto ${
          isLightMode ? 'bg-[#FAF6EF] border-[#1C1410]/15 text-[#1C1410]' : 'bg-[#251C17] border-[#EDE0CE]/15 text-[#EDE0CE]'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-inherit transition z-10 cursor-pointer"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-widest text-[#8C3B1E] font-semibold block mb-1">
                Victoria Island Reservation Pass
              </span>
              <h3 className="font-serif-luxury text-3xl font-normal">
                Reserve Your Dining Experience
              </h3>
              <p className="text-xs opacity-70 font-light mt-1">
                Immediate confirmation delivered to your WhatsApp or Email inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Salon Selection */}
              <div>
                <label className="block text-[11px] tracking-widest uppercase opacity-70 mb-1.5 font-medium">
                  Experience & Salon
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#B8894A] cursor-pointer ${
                    isLightMode ? 'bg-white border-[#1C1410]/15 text-[#1C1410]' : 'bg-[#1C1410] border-[#EDE0CE]/15 text-[#EDE0CE]'
                  }`}
                >
                  <option value="Chef's Table (Front Row Culinary Theatre)" className="bg-[#251C17] text-[#EDE0CE]">Chef’s Table (Front Row Culinary Theatre - 10 Seats)</option>
                  <option value="Main Obsidian Dining Salon" className="bg-[#251C17] text-[#EDE0CE]">Main Obsidian Dining Salon</option>
                  <option value="Sunset Rooftop & Vinyl Lounge" className="bg-[#251C17] text-[#EDE0CE]">Sunset Rooftop & Vinyl Lounge</option>
                  <option value="Salon Ọba (Private Sovereign Salon)" className="bg-[#251C17] text-[#EDE0CE]">Salon Ọba (Private Sovereign Salon 12-16 Guests)</option>
                  <option value="Chef Hearth Exclusive Buyout" className="bg-[#251C17] text-[#EDE0CE]">Chef Hearth Exclusive Buyout</option>
                </select>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] tracking-widest uppercase opacity-70 mb-1.5 font-medium">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#B8894A] cursor-pointer ${
                      isLightMode ? 'bg-white border-[#1C1410]/15 text-[#1C1410]' : 'bg-[#1C1410] border-[#EDE0CE]/15 text-[#EDE0CE]'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-widest uppercase opacity-70 mb-1.5 font-medium">
                    Seating Time
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#B8894A] cursor-pointer ${
                      isLightMode ? 'bg-white border-[#1C1410]/15 text-[#1C1410]' : 'bg-[#1C1410] border-[#EDE0CE]/15 text-[#EDE0CE]'
                    }`}
                  >
                    <option value="6:00 PM (Early Twilight)" className="bg-[#251C17] text-[#EDE0CE]">6:00 PM (Early Twilight)</option>
                    <option value="7:30 PM (Prime Dinner)" className="bg-[#251C17] text-[#EDE0CE]">7:30 PM (Prime Dinner)</option>
                    <option value="8:45 PM (Atmosphere Seating)" className="bg-[#251C17] text-[#EDE0CE]">8:45 PM (Atmosphere Seating)</option>
                    <option value="9:30 PM (Late Night Tasting)" className="bg-[#251C17] text-[#EDE0CE]">9:30 PM (Late Night Tasting)</option>
                  </select>
                </div>
              </div>

              {/* Party Size & Occasion */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] tracking-widest uppercase opacity-70 mb-1.5 font-medium">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#B8894A] cursor-pointer ${
                      isLightMode ? 'bg-white border-[#1C1410]/15 text-[#1C1410]' : 'bg-[#1C1410] border-[#EDE0CE]/15 text-[#EDE0CE]'
                    }`}
                  >
                    <option value="1 Guest (Solo Tasting Counter)" className="bg-[#251C17] text-[#EDE0CE]">1 Guest (Solo Tasting Counter)</option>
                    <option value="2 Guests (Intimate Table)" className="bg-[#251C17] text-[#EDE0CE]">2 Guests (Intimate Table)</option>
                    <option value="4 Guests (Social Table)" className="bg-[#251C17] text-[#EDE0CE]">4 Guests (Social Table)</option>
                    <option value="6 Guests (Celebration)" className="bg-[#251C17] text-[#EDE0CE]">6 Guests (Celebration)</option>
                    <option value="8+ Guests (Salon Request)" className="bg-[#251C17] text-[#EDE0CE]">8+ Guests (Salon Request)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] tracking-widest uppercase opacity-70 mb-1.5 font-medium">
                    Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#B8894A] cursor-pointer ${
                      isLightMode ? 'bg-white border-[#1C1410]/15 text-[#1C1410]' : 'bg-[#1C1410] border-[#EDE0CE]/15 text-[#EDE0CE]'
                    }`}
                  >
                    <option value="Chef Tasting Journey" className="bg-[#251C17] text-[#EDE0CE]">Chef Tasting Journey</option>
                    <option value="Birthday Celebration" className="bg-[#251C17] text-[#EDE0CE]">Birthday Celebration</option>
                    <option value="Anniversary & Romance" className="bg-[#251C17] text-[#EDE0CE]">Anniversary & Romance</option>
                    <option value="Executive Diplomatic Dinner" className="bg-[#251C17] text-[#EDE0CE]">Executive Diplomatic Dinner</option>
                    <option value="Private Salon Feast" className="bg-[#251C17] text-[#EDE0CE]">Private Salon Feast</option>
                  </select>
                </div>
              </div>

              {/* Guest Confirmation Delivery Preference */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] tracking-widest uppercase opacity-80 font-semibold">
                    How would you like to receive your reservation pass?
                  </label>
                  <span className="text-[10px] text-[#B8894A] font-medium">Host also receives email</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {/* WhatsApp Option */}
                  <button
                    type="button"
                    onClick={() => setConfirmationChannel('whatsapp')}
                    className={`p-2.5 rounded-xl border text-left transition relative flex flex-col justify-between cursor-pointer ${
                      confirmationChannel === 'whatsapp'
                        ? 'border-emerald-500 bg-emerald-500/10 shadow-sm shadow-emerald-500/20'
                        : isLightMode
                        ? 'border-[#1C1410]/15 hover:border-emerald-500/40 bg-white'
                        : 'border-[#EDE0CE]/15 hover:border-emerald-500/40 bg-[#1C1410]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <WhatsAppIcon className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-xs font-semibold text-emerald-500">WhatsApp</span>
                    </div>
                    <span className="text-[10px] opacity-70 leading-tight">Instant message pass</span>
                  </button>

                  {/* Email Option */}
                  <button
                    type="button"
                    onClick={() => setConfirmationChannel('email')}
                    className={`p-2.5 rounded-xl border text-left transition relative flex flex-col justify-between cursor-pointer ${
                      confirmationChannel === 'email'
                        ? 'border-[#B8894A] bg-[#B8894A]/10 shadow-sm shadow-[#B8894A]/20'
                        : isLightMode
                        ? 'border-[#1C1410]/15 hover:border-[#B8894A]/40 bg-white'
                        : 'border-[#EDE0CE]/15 hover:border-[#B8894A]/40 bg-[#1C1410]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Mail className="w-4 h-4 text-[#B8894A] shrink-0" />
                      <span className="text-xs font-semibold text-[#B8894A]">Email</span>
                    </div>
                    <span className="text-[10px] opacity-70 leading-tight">Digital pass in inbox</span>
                  </button>

                  {/* Both Option */}
                  <button
                    type="button"
                    onClick={() => setConfirmationChannel('both')}
                    className={`p-2.5 rounded-xl border text-left transition relative flex flex-col justify-between cursor-pointer ${
                      confirmationChannel === 'both'
                        ? 'border-[#B8894A] bg-gradient-to-r from-emerald-500/10 to-[#B8894A]/10 shadow-sm'
                        : isLightMode
                        ? 'border-[#1C1410]/15 hover:border-[#B8894A]/40 bg-white'
                        : 'border-[#EDE0CE]/15 hover:border-[#B8894A]/40 bg-[#1C1410]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Send className="w-3.5 h-3.5 text-[#B8894A] shrink-0" />
                      <span className="text-xs font-semibold">Both</span>
                    </div>
                    <span className="text-[10px] opacity-70 leading-tight">WhatsApp & Email</span>
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-[11px] tracking-widest uppercase opacity-70 mb-1 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Adebayo Adeleke"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#B8894A] ${
                      isLightMode ? 'bg-white border-[#1C1410]/15 text-[#1C1410]' : 'bg-[#1C1410] border-[#EDE0CE]/15 text-[#EDE0CE]'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[11px] tracking-widest uppercase opacity-70 font-medium">
                        Phone / WhatsApp
                      </label>
                      {confirmationChannel !== 'email' && (
                        <span className="text-[9px] text-emerald-500 font-semibold uppercase tracking-wider">
                          Pass Destination
                        </span>
                      )}
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="+234 813 547 5432"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none transition ${
                        confirmationChannel !== 'email'
                          ? 'border-emerald-500/50 focus:border-emerald-500'
                          : 'focus:border-[#B8894A]'
                      } ${isLightMode ? 'bg-white border-[#1C1410]/15 text-[#1C1410]' : 'bg-[#1C1410] border-[#EDE0CE]/15 text-[#EDE0CE]'}`}
                    />
                    {confirmationChannel !== 'email' && (
                      <span className="text-[10px] text-emerald-500 normal-case tracking-normal block mt-0.5">
                        ✓ Formatted WhatsApp pass sent directly here
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[11px] tracking-widest uppercase opacity-70 font-medium">
                        Email Address
                      </label>
                      {confirmationChannel !== 'whatsapp' && (
                        <span className="text-[9px] text-[#B8894A] font-semibold normal-case">
                          Confirmation inbox
                        </span>
                      )}
                    </div>
                    <input
                      type="email"
                      required={confirmationChannel === 'email' || confirmationChannel === 'both'}
                      placeholder="e.g. adebayo@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none transition ${
                        confirmationChannel !== 'whatsapp'
                          ? 'border-[#B8894A]/50 focus:border-[#B8894A]'
                          : 'focus:border-[#B8894A]'
                      } ${isLightMode ? 'bg-white border-[#1C1410]/15 text-[#1C1410]' : 'bg-[#1C1410] border-[#EDE0CE]/15 text-[#EDE0CE]'}`}
                    />
                    {confirmationChannel !== 'whatsapp' && (
                      <span className="text-[10px] text-[#B8894A] normal-case tracking-normal block mt-0.5">
                        ✓ Digital booking invite & receipt sent here
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] tracking-widest uppercase opacity-70 mb-1 font-medium">
                    Dietary Allergies & Special Accommodations
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Shellfish allergy, vegetarian guest in party, anniversary flowers arrangement..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#B8894A] ${
                      isLightMode ? 'bg-white border-[#1C1410]/15 text-[#1C1410]' : 'bg-[#1C1410] border-[#EDE0CE]/15 text-[#EDE0CE]'
                    }`}
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#B8894A] to-[#996F38] text-[#1C1410] text-xs tracking-[0.2em] uppercase font-bold hover:shadow-lg hover:shadow-[#B8894A]/25 transition duration-300 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#1C1410] border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Reservation...</span>
                    </>
                  ) : (
                    <span>
                      Generate Dining Pass & Deliver via{' '}
                      {confirmationChannel === 'whatsapp'
                        ? 'WhatsApp'
                        : confirmationChannel === 'email'
                        ? 'Email'
                        : 'WhatsApp & Email'}
                    </span>
                  )}
                </button>
                <p className="text-[10px] text-center opacity-60 mt-2">
                  Immediate confirmation. Host ledger notified via email. Tables held for 15 minutes.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Step 2: Digital Dining Pass Success State */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-widest text-[#B8894A] font-semibold">
              Reservation Confirmed
            </span>
            <h3 className="font-serif-luxury text-3xl font-normal mt-1 mb-2 text-inherit">
              We Look Forward to Welcoming You to Adùn
            </h3>

            <p className="text-xs opacity-75 max-w-sm mx-auto mb-5 font-light">
              Your table has been reserved in our Victoria Island guest ledger and dispatched to host hospitality.
            </p>

            {/* Notification Delivery Card */}
            <div
              className={`rounded-2xl p-4 border text-left text-xs mb-5 max-w-md mx-auto transition ${
                confirmedReservation?.confirmationChannel === 'whatsapp'
                  ? 'border-emerald-500/40 bg-emerald-500/10 shadow-lg shadow-emerald-500/10'
                  : confirmedReservation?.confirmationChannel === 'email'
                  ? 'border-[#B8894A]/40 bg-[#B8894A]/10 shadow-lg shadow-[#B8894A]/10'
                  : 'border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-[#B8894A]/10 shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-current/10">
                <div className="flex items-center gap-2">
                  {confirmedReservation?.confirmationChannel === 'email' ? (
                    <Mail className="w-4 h-4 text-[#B8894A]" />
                  ) : (
                    <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                  )}
                  <span className="font-semibold uppercase tracking-wider text-[11px]">
                    {confirmedReservation?.confirmationChannel === 'whatsapp'
                      ? 'WhatsApp Confirmation Dispatched'
                      : confirmedReservation?.confirmationChannel === 'email'
                      ? 'Email Confirmation Dispatched'
                      : 'WhatsApp & Email Dispatched'}
                  </span>
                </div>
                <span className="text-[10px] opacity-70">Host Desk CC'd</span>
              </div>

              <p className="opacity-80 text-[11px] leading-relaxed mb-3">
                {confirmedReservation?.confirmationChannel === 'whatsapp' ? (
                  <>
                    An official digital dining pass has been prepared for <strong>{confirmedReservation?.guestPhone}</strong>. You can open and save it directly in your WhatsApp.
                  </>
                ) : confirmedReservation?.confirmationChannel === 'email' ? (
                  <>
                    A reservation voucher and calendar invite have been delivered to <strong>{confirmedReservation?.guestEmail}</strong>.
                  </>
                ) : (
                  <>
                    Confirmed via WhatsApp to <strong>{confirmedReservation?.guestPhone}</strong> and email to <strong>{confirmedReservation?.guestEmail}</strong>.
                  </>
                )}
              </p>

              {/* Direct WhatsApp Open / Action Links */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {confirmedReservation?.guestPhone && (
                  <a
                    href={guestWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow"
                    title="Open your reservation pass in WhatsApp"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Open Pass on WhatsApp</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                )}

                {confirmedReservation?.guestEmail && confirmedReservation?.confirmationChannel === 'whatsapp' && (
                  <button
                    onClick={() => {
                      // Trigger mailto for user
                      const subject = encodeURIComponent(`Adùn Dining Pass [${confirmedReservation.referenceCode}]`);
                      const body = encodeURIComponent(createWhatsAppMessage(confirmedReservation));
                      window.location.href = `mailto:${confirmedReservation.guestEmail}?subject=${subject}&body=${body}`;
                    }}
                    className="py-2 px-3 rounded-xl border border-white/20 hover:bg-white/10 text-xs transition flex items-center gap-1.5"
                    title="Send a copy to email as well"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#B8894A] shrink-0" />
                    <span>Email Copy</span>
                  </button>
                )}

                <a
                  href={conciergeWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl border border-white/20 hover:bg-white/10 text-xs transition flex items-center gap-1.5"
                  title="Contact Adùn Concierge Desk"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#B8894A]" />
                  <span>Host Desk</span>
                </a>
              </div>
            </div>

            {/* Boarding Pass Ticket */}
            <div
              className={`rounded-2xl p-4 sm:p-6 border text-left text-xs space-y-3 mb-6 max-w-md mx-auto shadow-2xl relative ${
                isLightMode ? 'bg-white border-[#B8894A]/40 text-[#1C1410]' : 'bg-[#1C1410] border-[#B8894A]/30 gold-border-glow text-[#EDE0CE]'
              }`}
            >
              <div className="flex justify-between items-center border-b border-current/10 pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest opacity-60 block">Reference Pass</span>
                  <span className="font-mono text-base font-bold text-[#B8894A]">
                    {confirmedReservation?.referenceCode}
                  </span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[11px] transition cursor-pointer"
                  title="Copy reference code"
                >
                  {hasCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{hasCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 border-b border-current/10 pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest opacity-60 block">Guest</span>
                  <span className="font-medium text-inherit">{confirmedReservation?.guestName}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest opacity-60 block">Party</span>
                  <span className="font-medium text-inherit">{confirmedReservation?.guests}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-b border-current/10 pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest opacity-60 block">Date</span>
                  <span className="font-medium text-inherit">{confirmedReservation?.date}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest opacity-60 block">Time</span>
                  <span className="font-medium text-inherit">{confirmedReservation?.time}</span>
                </div>
              </div>

              <div className="border-b border-current/10 pb-3">
                <span className="text-[10px] uppercase tracking-widest opacity-60 block">Salon Experience</span>
                <span className="font-medium text-inherit">{confirmedReservation?.experience}</span>
              </div>

              <div className="flex justify-between items-center pt-1 text-[11px] opacity-75">
                <span>Sanctuary:</span>
                <span>Plot 14B Sinari Daranijo, VI</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleDownloadCalendar}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-[#B8894A]/60 hover:bg-[#B8894A]/10 text-[#B8894A] text-xs uppercase tracking-widest font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-7 py-2.5 rounded-full bg-[#B8894A] text-[#1C1410] text-xs uppercase tracking-widest font-bold hover:bg-[#CD9B58] transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
