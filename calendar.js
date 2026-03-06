// Calendar for displaying availability
class AvailabilityCalendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedMonth = this.currentDate.getMonth();
        this.selectedYear = this.currentDate.getFullYear();
        this.weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        this.months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        this.init();
    }
    init() {
        this.renderCalendar();
        this.setupEventListeners();
        this.updateLastUpdateDate();
    }
    setupEventListeners() {
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.selectedMonth--;
            if (this.selectedMonth < 0) {
                this.selectedMonth = 11;
                this.selectedYear--;
            }
            this.renderCalendar();
        });
        document.getElementById('nextMonth').addEventListener('click', () => {
            this.selectedMonth++;
            if (this.selectedMonth > 11) {
                this.selectedMonth = 0;
                this.selectedYear++;
            }
            this.renderCalendar();
        });
    }
    renderCalendar() {
        const calendar = document.getElementById('calendar');
        const monthElement = document.getElementById('currentMonth');

        monthElement.textContent = `${this.months[this.selectedMonth]} ${this.selectedYear}`;

        calendar.innerHTML = '';

        // Create container for weekday headers using Bootstrap grid
        const headerRow = document.createElement('div');
        headerRow.className = 'row g-1 g-sm-2 mb-2';

        this.weekDays.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'col text-center fw-bold text-muted small';
            dayHeader.textContent = day;
            headerRow.appendChild(dayHeader);
        });
        calendar.appendChild(headerRow);

        // Get first day of month
        const firstDay = new Date(this.selectedYear, this.selectedMonth, 1);
        let firstDayOfWeek = firstDay.getDay();
        // Adjust for Monday as first day of week (0 = Sunday -> 6)
        firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

        // Get last day of month
        const lastDay = new Date(this.selectedYear, this.selectedMonth + 1, 0);
        const daysInMonth = lastDay.getDate();

        // Create rows for calendar days using Bootstrap grid
        let currentWeekRow = this.createWeekRow();
        calendar.appendChild(currentWeekRow);

        // Add empty cells before first day
        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'col';
            currentWeekRow.appendChild(emptyDay);
        }

        // Add days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = this.createDayElement(day);
            currentWeekRow.appendChild(dayElement);

            // Start new row after Sunday (index 6)
            const currentDayOfWeek = (firstDayOfWeek + day - 1) % 7;
            if (currentDayOfWeek === 6 && day < daysInMonth) {
                currentWeekRow = this.createWeekRow();
                calendar.appendChild(currentWeekRow);
            }
        }
    }

    createWeekRow() {
        const row = document.createElement('div');
        row.className = 'row g-1 g-sm-2 mb-1 mb-sm-2';
        return row;
    }
    createDayElement(day) {
        const colWrapper = document.createElement('div');
        colWrapper.className = 'col';

        const dayElement = document.createElement('div');
        dayElement.className = 'd-flex flex-column align-items-center justify-content-center border rounded-3 p-1 p-sm-2 bg-white shadow-sm';
        dayElement.style.minHeight = '50px';
        dayElement.style.height = '100%';
        dayElement.style.cursor = 'pointer';

        const dateStr = this.formatDate(this.selectedYear, this.selectedMonth, day);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const cellDate = new Date(this.selectedYear, this.selectedMonth, day);

        const dayNumber = document.createElement('div');
        dayNumber.className = 'fs-6 fs-sm-5 fw-bold mb-1';
        dayNumber.textContent = day;

        // Check if date is in the past
        if (cellDate < currentDate) {
            dayElement.className = 'd-flex flex-column align-items-center justify-content-center border rounded-3 p-1 p-sm-2 bg-light opacity-50';
            dayElement.style.minHeight = '50px';
            dayElement.style.height = '100%';
            dayElement.style.cursor = 'default';
            dayNumber.className = 'fs-6 fs-sm-5 fw-bold mb-1 text-muted';
            const badge = document.createElement('span');
            badge.className = 'badge bg-secondary';
            badge.style.fontSize = '0.65rem';
            badge.textContent = '—';
            dayElement.appendChild(dayNumber);
            dayElement.appendChild(badge);
            colWrapper.appendChild(dayElement);
            return colWrapper;
        }

        // Check availability from data
        const data = availabilityData[dateStr];

        // Parse data - support both old format (string) and new format (object)
        let status, who;
        if (typeof data === 'string') {
            status = data;
            who = 'Both';
        } else if (data && typeof data === 'object') {
            status = data.status;
            who = data.who || 'Both';
        } else {
            status = 'available';
            who = 'Both';
        }

        if (status === 'busy') {
            // Apply different Bootstrap classes based on who is busy
            if (who === 'Ivan') {
                dayElement.className = 'd-flex flex-column align-items-center justify-content-center border border-warning border-2 rounded-3 p-1 p-sm-2 shadow-sm';
                dayElement.style.minHeight = '50px';
                dayElement.style.height = '100%';
                dayElement.style.background = 'linear-gradient(135deg, #fff4e6 0%, #ffe8cc 100%)';
            } else if (who === 'Vlada') {
                dayElement.className = 'd-flex flex-column align-items-center justify-content-center border rounded-3 p-1 p-sm-2 shadow-sm';
                dayElement.style.minHeight = '50px';
                dayElement.style.height = '100%';
                dayElement.style.borderColor = '#d63384';
                dayElement.style.borderWidth = '2px';
                dayElement.style.background = 'linear-gradient(135deg, #fce7f3 0%, #f9dae6 100%)';
            } else {
                dayElement.className = 'd-flex flex-column align-items-center justify-content-center border border-danger border-2 rounded-3 p-1 p-sm-2 shadow-sm';
                dayElement.style.minHeight = '50px';
                dayElement.style.height = '100%';
                dayElement.style.background = 'linear-gradient(135deg, #fde8ea 0%, #fbd5d8 100%)';
            }

            const badge = document.createElement('span');
            badge.style.fontSize = '0.65rem';
            if (who === 'Ivan') {
                badge.className = 'badge text-uppercase';
                badge.style.backgroundColor = '#fd7e14';
            } else if (who === 'Vlada') {
                badge.className = 'badge text-uppercase';
                badge.style.backgroundColor = '#d63384';
            } else {
                badge.className = 'badge bg-danger text-uppercase';
            }
            badge.textContent = who === 'Both' ? 'Busy' : who.charAt(0);
            dayElement.appendChild(dayNumber);
            dayElement.appendChild(badge);
        } else {
            // Status not specified or available - show as available by default
            dayElement.className = 'd-flex flex-column align-items-center justify-content-center border border-success border-2 rounded-3 p-1 p-sm-2 shadow-sm';
            dayElement.style.minHeight = '50px';
            dayElement.style.height = '100%';
            dayElement.style.background = 'linear-gradient(135deg, #d1f4e0 0%, #c8f0dd 100%)';
            const badge = document.createElement('span');
            badge.className = 'badge bg-success text-uppercase';
            badge.style.fontSize = '0.65rem';
            badge.textContent = '✓';
            dayElement.appendChild(dayNumber);
            dayElement.appendChild(badge);
        }

        colWrapper.appendChild(dayElement);
        return colWrapper;
    }
    formatDate(year, month, day) {
        const monthStr = String(month + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        return `${year}-${monthStr}-${dayStr}`;
    }
    updateLastUpdateDate() {
        const lastUpdateElement = document.getElementById('lastUpdate');
        if (typeof lastUpdateDate !== 'undefined') {
            const date = new Date(lastUpdateDate);
            lastUpdateElement.textContent = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }
}
// Initialize calendar on page load
document.addEventListener('DOMContentLoaded', () => {
    new AvailabilityCalendar();
});
