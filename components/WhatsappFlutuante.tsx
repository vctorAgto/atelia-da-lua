import { linkWhatsappGenerico } from '@/lib/whatsapp'
import { WhatsappIcon } from './ProdutoCard'

export default function WhatsappFlutuante() {
  return (
    <a
      href={linkWhatsappGenerico()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 bg-[#25D366] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:scale-105 transition"
      title="Fale conosco no WhatsApp"
    >
      <WhatsappIcon size={28} />
    </a>
  )
}
