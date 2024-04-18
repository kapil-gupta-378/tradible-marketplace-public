'use client'
import { useState } from 'react'

const useAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLocationForm, setIsLocationForm] = useState<boolean>(false)
  const [modalRemove, setModalRemove] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleEditModal = () => {
    setIsLocationForm(true)
    openModal()
  }
  return {
    openModal,
    closeModal,
    handleEditModal,
    isModalOpen,
    setIsLocationForm,
    isLocationForm,
    setModalRemove,
    modalRemove,
  }
}

export default useAddress
