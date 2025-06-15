// ===== FINANCIAL DASHBOARD CONTROLLER =====

class FinancialDashboard {
  constructor() {
    this.transactions = this.loadTransactions()
    this.currentTransactionType = "income"
    this.currentFilter = "all"

    this.initializeEventListeners()
    this.initializeTheme()
    this.updateDashboard()
    this.setDefaultDate()
  }

  // ===== INITIALIZATION =====
  initializeEventListeners() {
    // Form submission
    document.getElementById("transactionForm").addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleFormSubmission()
    })

    // Transaction type buttons
    document.querySelectorAll(".type-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.handleTypeSelection(e.target.closest(".type-btn"))
      })
    })

    // Theme toggle
    document.getElementById("themeToggle").addEventListener("click", () => {
      this.toggleTheme()
    })

    // Filter selection
    document.getElementById("typeFilter").addEventListener("change", (e) => {
      this.currentFilter = e.target.value
      this.renderTransactions()
    })

    // Delete transaction event delegation
    document.getElementById("transactionsTableBody").addEventListener("click", (e) => {
      if (e.target.closest(".delete-btn")) {
        const transactionId = e.target.closest(".delete-btn").dataset.id
        this.deleteTransaction(transactionId)
      }
    })
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem("theme") || "light"
    document.documentElement.setAttribute("data-theme", savedTheme)
    this.updateThemeIcon(savedTheme)
  }

  setDefaultDate() {
    const today = new Date().toISOString().split("T")[0]
    document.getElementById("date").value = today
  }

  // ===== TRANSACTION MANAGEMENT =====
  handleFormSubmission() {
    const formData = this.getFormData()

    if (this.validateFormData(formData)) {
      const transaction = this.createTransaction(formData)
      this.addTransaction(transaction)
      this.clearForm()
      this.updateDashboard()
      this.showSuccessMessage("Transação adicionada com sucesso!")
    }
  }

  getFormData() {
    return {
      description: document.getElementById("description").value.trim(),
      amount: Number.parseFloat(document.getElementById("amount").value),
      date: document.getElementById("date").value,
      type: this.currentTransactionType,
    }
  }

  validateFormData(data) {
    const errors = []

    if (!data.description) {
      errors.push("Descrição é obrigatória")
    }

    if (!data.amount || data.amount <= 0) {
      errors.push("Valor deve ser maior que zero")
    }

    if (!data.date) {
      errors.push("Data é obrigatória")
    }

    if (errors.length > 0) {
      this.showErrorMessage(errors.join(", "))
      return false
    }

    return true
  }

  createTransaction(data) {
    return {
      id: this.generateId(),
      description: data.description,
      amount: data.amount,
      date: data.date,
      type: data.type,
      createdAt: new Date().toISOString(),
    }
  }

  addTransaction(transaction) {
    this.transactions.unshift(transaction)
    this.saveTransactions()
  }

  deleteTransaction(id) {
    if (confirm("Tem certeza que deseja excluir esta transação?")) {
      this.transactions = this.transactions.filter((t) => t.id !== id)
      this.saveTransactions()
      this.updateDashboard()
      this.showSuccessMessage("Transação excluída com sucesso!")
    }
  }

  // ===== UI UPDATES =====
  updateDashboard() {
    this.updateSummaryCards()
    this.renderTransactions()
  }

  updateSummaryCards() {
    const summary = this.calculateSummary()

    document.getElementById("totalIncome").textContent = this.formatCurrency(summary.income)
    document.getElementById("totalExpense").textContent = this.formatCurrency(summary.expense)
    document.getElementById("totalBalance").textContent = this.formatCurrency(summary.balance)

    // Update balance card color based on positive/negative
    const balanceCard = document.querySelector(".balance-card")
    balanceCard.classList.toggle("negative-balance", summary.balance < 0)
  }

  renderTransactions() {
    const tbody = document.getElementById("transactionsTableBody")
    const emptyState = document.getElementById("emptyState")

    const filteredTransactions = this.getFilteredTransactions()

    if (filteredTransactions.length === 0) {
      tbody.innerHTML = ""
      emptyState.style.display = "block"
      return
    }

    emptyState.style.display = "none"
    tbody.innerHTML = filteredTransactions.map((transaction) => this.createTransactionRow(transaction)).join("")
  }

  createTransactionRow(transaction) {
    const typeIcon = transaction.type === "income" ? "fa-arrow-up" : "fa-arrow-down"
    const typeText = transaction.type === "income" ? "Entrada" : "Saída"
    const amountClass = transaction.type === "income" ? "amount-income" : "amount-expense"
    const badgeClass = transaction.type === "income" ? "income" : "expense"

    return `
            <tr>
                <td>
                    <div class="transaction-description">
                        ${this.escapeHtml(transaction.description)}
                    </div>
                </td>
                <td>
                    <span class="type-badge ${badgeClass}">
                        <i class="fas ${typeIcon}"></i>
                        ${typeText}
                    </span>
                </td>
                <td class="${amountClass}">
                    ${transaction.type === "income" ? "+" : "-"} ${this.formatCurrency(transaction.amount)}
                </td>
                <td>${this.formatDate(transaction.date)}</td>
                <td>
                    <button class="delete-btn" data-id="${transaction.id}" title="Excluir transação">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `
  }

  // ===== CALCULATIONS =====
  calculateSummary() {
    const income = this.transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

    const expense = this.transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

    return {
      income,
      expense,
      balance: income - expense,
    }
  }

  getFilteredTransactions() {
    if (this.currentFilter === "all") {
      return this.transactions
    }
    return this.transactions.filter((t) => t.type === this.currentFilter)
  }

  // ===== EVENT HANDLERS =====
  handleTypeSelection(button) {
    // Remove active class from all buttons
    document.querySelectorAll(".type-btn").forEach((btn) => {
      btn.classList.remove("active")
    })

    // Add active class to clicked button
    button.classList.add("active")

    // Update current transaction type
    this.currentTransactionType = button.dataset.type
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    this.updateThemeIcon(newTheme)
  }

  updateThemeIcon(theme) {
    const icon = document.querySelector("#themeToggle i")
    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon"
  }

  // ===== UTILITY FUNCTIONS =====
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  formatDate(dateString) {
    return new Date(dateString + "T00:00:00").toLocaleDateString("pt-BR")
  }

  escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }

  clearForm() {
    document.getElementById("transactionForm").reset()
    this.setDefaultDate()

    // Reset type selection to income
    document.querySelectorAll(".type-btn").forEach((btn) => {
      btn.classList.remove("active")
    })
    document.querySelector('[data-type="income"]').classList.add("active")
    this.currentTransactionType = "income"
  }

  // ===== LOCAL STORAGE =====
  loadTransactions() {
    try {
      const stored = localStorage.getItem("financial-transactions")
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error("Erro ao carregar transações:", error)
      return []
    }
  }

  saveTransactions() {
    try {
      localStorage.setItem("financial-transactions", JSON.stringify(this.transactions))
    } catch (error) {
      console.error("Erro ao salvar transações:", error)
      this.showErrorMessage("Erro ao salvar dados. Verifique o espaço de armazenamento.")
    }
  }

  // ===== NOTIFICATIONS =====
  showSuccessMessage(message) {
    this.showNotification(message, "success")
  }

  showErrorMessage(message) {
    this.showNotification(message, "error")
  }

  showNotification(message, type) {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
            <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}"></i>
            <span>${message}</span>
        `

    // Add styles
    Object.assign(notification.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "1rem 1.5rem",
      borderRadius: "8px",
      color: "white",
      fontWeight: "500",
      zIndex: "1000",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      minWidth: "300px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      transform: "translateX(100%)",
      transition: "transform 0.3s ease-in-out",
      backgroundColor: type === "success" ? "#4CAF50" : "#F44336",
    })

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Remove after delay
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }
}

// ===== INITIALIZE APPLICATION =====
document.addEventListener("DOMContentLoaded", () => {
  new FinancialDashboard()
})

// ===== ADDITIONAL CSS FOR NEGATIVE BALANCE =====
const additionalStyles = `
    .balance-card.negative-balance .card-icon {
        background: linear-gradient(135deg, var(--danger-color), #ef5350) !important;
    }
`

// Inject additional styles
const styleSheet = document.createElement("style")
styleSheet.textContent = additionalStyles
document.head.appendChild(styleSheet)
