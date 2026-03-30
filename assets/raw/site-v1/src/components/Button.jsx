import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-gradient-to-r from-ix-purple to-ix-blue text-white shadow-card hover:shadow-card-elevated hover:shadow-ix-purple/20',
  secondary: 'border border-white/20 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/40',
  white: 'bg-white text-gray-900 shadow-card hover:shadow-card-elevated',
  kido: 'bg-gradient-to-r from-kido-lime to-kido-blue text-white shadow-card hover:shadow-card-elevated hover:shadow-kido-lime/20',
  fl: 'bg-gradient-to-r from-fl-red to-fl-neon text-gray-900 shadow-card hover:shadow-card-elevated hover:shadow-fl-red/20',
  'fl-dark': 'bg-fl-dark text-white shadow-card hover:shadow-card-elevated hover:shadow-fl-dark/20',
  ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
}

const sizes = {
  sm: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  md: 'px-7 py-3.5 text-base rounded-2xl gap-2.5',
  lg: 'px-8 py-4 text-base rounded-2xl gap-2.5',
}

export default function Button({
  variant = 'primary',
  size = 'lg',
  to,
  href,
  children,
  className = '',
  icon: Icon,
  ...props
}) {
  const baseClasses = `group inline-flex items-center justify-center font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${variants[variant]} ${sizes[size]} ${className}`

  const inner = (
    <>
      {children}
      {Icon && <Icon size={size === 'sm' ? 16 : 18} className="group-hover:translate-x-0.5 transition-transform duration-300" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={baseClasses} {...props}>
        {inner}
      </Link>
    )
  }

  if (href) {
    return (
      <motion.a href={href} className={baseClasses} {...props}>
        {inner}
      </motion.a>
    )
  }

  return (
    <button className={baseClasses} {...props}>
      {inner}
    </button>
  )
}
