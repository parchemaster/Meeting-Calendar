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
        // Add weekday headers
        this.weekDays.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-header';
            dayHeader.textContent = day;
            calendar.appendChild(dayHeader);
        });
        // Get first day of month
        const firstDay = new Date(this.selectedYear, this.selectedMonth, 1);
        let firstDayOfWeek = firstDay.getDay();
        // Adjust for Monday as first day of week (0 = Sunday -> 6)
        firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
        // Get last day of month
        const lastDay = new Date(this.selectedYear, this.selectedMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        // Add empty cells before first day
        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendar.appendChild(emptyDay);
        }
        // Add days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = this.createDayElement(day);
            calendar.appendChild(dayElement);
        }
    }
    createDayElement(day) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        const dateStr = this.formatDate(this.selectedYear, this.selectedMonth, day);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const cellDate = new Date(this.selectedYear, this.selectedMonth, day);
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        // Check if date is in the past
        if (cellDate < currentDate) {
            dayElement.classList.add('past');
            const badge = document.createElement('span');
            badge.className = 'status-badge';
            badge.textContent = '—';
            dayElement.appendChild(dayNumber);
            dayElement.appendChild(badge);
            return dayElement;
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
            // Apply different CSS classes based on who is busy
            if (who === 'Ivan') {
                dayElement.classList.add('busy-ivan');
            } else if (who === 'Vlada') {
                dayElement.classList.add('busy-vlada');
            } else {
                dayElement.classList.add('busy');
            }

            const badge = document.createElement('span');
            badge.className = 'status-badge';
            badge.textContent = who === 'Both' ? 'Busy' : `${who} Busy`;
            dayElement.appendChild(dayNumber);
            dayElement.appendChild(badge);
        } else {
            // Status not specified or available - show as available by default
            dayElement.classList.add('available');
            const badge = document.createElement('span');
            badge.className = 'status-badge';
            badge.textContent = 'Available';
            dayElement.appendChild(dayNumber);
            dayElement.appendChild(badge);
        }

        return dayElement;
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
