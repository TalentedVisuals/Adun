import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Calendar, Clock, Users, Sparkles, Download, Copy, Check } from 'lucide-react';
import { ReservationData } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedExperience?: string;
  preselectedDate?: string;
  preselectedGuests?: string;
  isLightMode: boolean;
}

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

  // Confirmation Record
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      guestName: name || 'Valued Guest',
      guestPhone: phone,
      guestEmail: email,
      notes,
      createdAt: new Date().toISOString(),
    };

    // Dispatch directly to user's FormSubmit endpoint with provided secret key
    try {
      await fetch('https://formsubmit.co/ajax/32056367a847e46a95ba48aca22f7755', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Àdùn Reservation Pass [${randomCode}] - ${name || 'Valued Guest'} (${guests})`,
          _template: 'table',
          _captcha: 'false',
          'Reference Code': randomCode,
          'Guest Name': name || 'Valued Guest',
          'Guest Phone / WhatsApp': phone,
          'Guest Email': email,
          'Experience / Salon': experience,
          'Reservation Date': date,
          'Seating Time': time,
          'Party Size': guests,
          'Occasion': occasion,
          'Dietary Allergies & Special Notes': notes || 'None specified',
          'Submitted At': new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' }) + ' (WAT)',
        }),
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
      'PRODID:-//Àdùn Victoria Island//Reservation Pass//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Dinner Reservation at Àdùn (${confirmedReservation.experience})`,
      `DESCRIPTION:Reservation Reference: ${confirmedReservation.referenceCode}\\nGuests: ${confirmedReservation.guests}\\nHost Desk: +234 808 920 0011`,
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
    link.setAttribute('download', `Adun-Reservation-${confirmedReservation.referenceCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetAndClose = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div
        className={`relative w-full max-w-xl rounded-2xl sm:rounded-3xl border p-4 sm:p-6 md:p-8 shadow-2xl transition-colors max-h-[92vh] overflow-y-auto ${
          isLightMode ? 'bg-[#f7f4ee] border-[#1a1715]/15 text-[#1a1715]' : 'bg-[#171513] border-white/15 text-[#e8ded1]'
        }`}
      >
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-inherit transition z-10"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-widest text-[#cba358] font-semibold block mb-1">
                Victoria Island Reservation Pass
              </span>
              <h3 className="font-serif-luxury text-3xl font-normal">
                Reserve Your Dining Experience
              </h3>
              <p className="text-xs opacity-60 font-light mt-1">
                Immediate confirmation. Instant digital calendar invitation generated.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Salon Selection */}
              <div>
                <label className="block text-[11px] tracking-widest uppercase opacity-60 mb-1.5 font-medium">
                  Experience & Salon
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#cba358] cursor-pointer ${
                    isLightMode ? 'bg-white border-[#1a1715]/15' : 'bg-[#11100e] border-white/10'
                  }`}
                >
                  <option value="Chef's Table (Front Row Culinary Theatre)">Chef’s Table (Front Row Culinary Theatre - 10 Seats)</option>
                  <option value="Main Obsidian Dining Salon">Main Obsidian Dining Salon</option>
                  <option value="Sunset Rooftop & Vinyl Lounge">Sunset Rooftop & Vinyl Lounge</option>
                  <option value="Salon Ọba (Private Sovereign Salon)">Salon Ọba (Private 12-16 Person Salon)</option>
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] tracking-widest uppercase opacity-60 mb-1.5 font-medium">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#cba358] cursor-pointer ${
                      isLightMode ? 'bg-white border-[#1a1715]/15' : 'bg-[#11100e] border-white/10'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-widest uppercase opacity-60 mb-1.5 font-medium">
                    Time Slot
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#cba358] cursor-pointer ${
                      isLightMode ? 'bg-white border-[#1a1715]/15' : 'bg-[#11100e] border-white/10'
                    }`}
                  >
                    <option value="6:00 PM (Sunset Seating)">6:00 PM (Sunset Seating)</option>
                    <option value="7:30 PM (Prime Dinner)">7:30 PM (Prime Dinner)</option>
                    <option value="8:45 PM (Peak Hearth)">8:45 PM (Peak Hearth)</option>
                    <option value="10:00 PM (Late Night Vinyl)">10:00 PM (Late Night & Vinyl)</option>
                  </select>
                </div>
              </div>

              {/* Party Size & Occasion */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] tracking-widest uppercase opacity-60 mb-1.5 font-medium">
                    Party Size
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#cba358] cursor-pointer ${
                      isLightMode ? 'bg-white border-[#1a1715]/15' : 'bg-[#11100e] border-white/10'
                    }`}
                  >
                    <option value="2 Guests (Intimate Table)">2 Guests (Intimate Table)</option>
                    <option value="4 Guests (Social Table)">4 Guests (Social Table)</option>
                    <option value="6 Guests (Celebration)">6 Guests (Celebration)</option>
                    <option value="8-12 Guests (Salon Setup)">8–12 Guests (Salon Setup)</option>
                    <option value="Full Buyout Request">Full Buyout Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] tracking-widest uppercase opacity-60 mb-1.5 font-medium">
                    Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#cba358] cursor-pointer ${
                      isLightMode ? 'bg-white border-[#1a1715]/15' : 'bg-[#11100e] border-white/10'
                    }`}
                  >
                    <option value="Chef Tasting Journey">Chef Tasting Journey</option>
                    <option value="Romantic Date Night">Romantic Date Night</option>
                    <option value="Executive Business Dinner">Executive / Board Dinner</option>
                    <option value="Birthday Celebration">Birthday Celebration</option>
                    <option value="Anniversary">Anniversary</option>
                  </select>
                </div>
              </div>

              {/* Guest Name & WhatsApp / Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] tracking-widest uppercase opacity-60 mb-1.5 font-medium">
                    Lead Guest Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Folashade Adeleke"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#cba358] ${
                      isLightMode ? 'bg-white border-[#1a1715]/15' : 'bg-[#11100e] border-white/10'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-widest uppercase opacity-60 mb-1.5 font-medium">
                    Nigerian Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 803 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#cba358] ${
                      isLightMode ? 'bg-white border-[#1a1715]/15' : 'bg-[#11100e] border-white/10'
                    }`}
                  />
                </div>
              </div>

              {/* Guest Email */}
              <div>
                <label className="block text-[11px] tracking-widest uppercase opacity-60 mb-1.5 font-medium">
                  Email Address (For Calendar Invite & Digest)
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. folashade@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#cba358] ${
                    isLightMode ? 'bg-white border-[#1a1715]/15' : 'bg-[#11100e] border-white/10'
                  }`}
                />
              </div>

              {/* Dietary / Special Notes */}
              <div>
                <label className="block text-[11px] tracking-widest uppercase opacity-60 mb-1.5 font-medium">
                  Dietary Allergies or Special Host Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Shellfish allergy, corner table preferred"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#cba358] ${
                    isLightMode ? 'bg-white border-[#1a1715]/15' : 'bg-[#11100e] border-white/10'
                  }`}
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#cba358] to-[#ab8235] text-[#080706] text-xs tracking-[0.2em] uppercase font-bold hover:shadow-lg hover:shadow-[#cba358]/20 transition duration-300 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#080706] border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Reservation...</span>
                    </>
                  ) : (
                    <span>Generate Digital Dining Pass</span>
                  )}
                </button>
                <p className="text-[10px] text-center opacity-50 mt-2">
                  No advance card charge required for standard seatings. Tables held for 15 minutes.
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

            <span className="text-xs uppercase tracking-widest text-[#cba358] font-semibold">
              Reservation Confirmed
            </span>
            <h3 className="font-serif-luxury text-3xl font-normal mt-1 mb-2">
              We Look Forward to Welcoming You to Àdùn
            </h3>
            
            <p className="text-xs opacity-75 max-w-sm mx-auto mb-6">
              Your table has been reserved in our Victoria Island guest ledger.
            </p>

            {/* Boarding Pass Ticket */}
            <div
              className={`rounded-2xl p-4 sm:p-6 border text-left text-xs space-y-3 mb-6 max-w-md mx-auto shadow-2xl relative ${
                isLightMode ? 'bg-white border-[#cba358]/40' : 'bg-[#11100e] border-[#cba358]/30 gold-border-glow'
              }`}
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest opacity-50 block">Reference Pass</span>
                  <span className="font-mono text-base font-bold text-[#cba358]">
                    {confirmedReservation?.referenceCode}
                  </span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[11px] transition"
                  title="Copy reference code"
                >
                  {hasCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{hasCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest opacity-50 block">Guest</span>
                  <span className="font-medium text-inherit">{confirmedReservation?.guestName}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest opacity-50 block">Party</span>
                  <span className="font-medium text-inherit">{confirmedReservation?.guests}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest opacity-50 block">Date</span>
                  <span className="font-medium text-inherit">{confirmedReservation?.date}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest opacity-50 block">Time</span>
                  <span className="font-medium text-inherit">{confirmedReservation?.time}</span>
                </div>
              </div>

              <div className="border-b border-white/10 pb-3">
                <span className="text-[10px] uppercase tracking-widest opacity-50 block">Salon Experience</span>
                <span className="font-medium text-inherit">{confirmedReservation?.experience}</span>
              </div>

              <div className="flex justify-between items-center pt-1 text-[11px] opacity-70">
                <span>Sanctuary:</span>
                <span>Plot 14B Sinari Daranijo, VI</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleDownloadCalendar}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-[#cba358]/50 hover:bg-[#cba358]/10 text-[#cba358] text-xs uppercase tracking-widest font-semibold transition flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-7 py-2.5 rounded-full bg-[#cba358] text-[#080706] text-xs uppercase tracking-widest font-bold hover:bg-[#e4c47e] transition"
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
