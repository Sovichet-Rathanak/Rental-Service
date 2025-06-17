<template>
  <div class="dynamicTable">
    <table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">
            {{ column.label }}
          </th>
          <th v-if="showStatus">Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="row.id || index" class="tableRow" @click="handleRowClick(row)">
          <!-- Render row data -->
          <td v-for="column in columns" :key="column.key">
            <template v-if="column.type === 'image'">
              <img :src="row[column.key]" alt="Image" style="width: 70px; height: 70px; border-radius: 8px;" />
            </template>
            <template v-else>
              {{ row[column.key] }}
            </template>
          </td>

          <!-- Status column -->
          <td v-if="showStatus">
            <template v-if="!row.status">
              <button class="icon-btn" @click.stop="setStatus(index, 'Approved')">
                <Icon icon="akar-icons:check-box-fill" width="35" height="35" style="color: #0014ff" />
              </button>
              <button class="icon-btn" @click.stop="setStatus(index, 'Rejected')">
                <Icon icon="solar:close-square-bold" width="35" height="35" style="color: #f00" />
              </button>
            </template>
            <template v-else>
              <StatusLabel :status="row.status" />
            </template>
          </td>

          <!-- Action column -->
          <td>
            <ActionButton 
              :index="index" 
              :show-edit="showEdit"
              @edit-item="editItem" 
              @delete-item="deleteItem" 
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ActionButton from './ActionButton.vue';
import StatusLabel from './statusLabel.vue';
import { Icon } from '@iconify/vue';

export default {
  components: {
    ActionButton,
    StatusLabel,
    Icon,
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    showStatus: {
      type: Boolean,
      default: true,
    },
    showEdit: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleRowClick(row) {
      this.$emit('row-click', row);
    },
    editItem(index) {
      const row = this.rows[index];
      this.$emit('edit-item', row);
    },
    deleteItem(index) {
      this.$emit('delete-item', index);
    },
    setStatus(index, newStatus) {
      this.rows[index].status = newStatus;
    },
  },
};
</script>

<style scoped>
.dynamicTable {
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 20px;
}

thead {
  background-color: #487cff;
  color: white;
}

th {
  padding: 16px 20px;
  text-align: center;
  font-weight: 600;
  align-items: center;
}

.tableRow {
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.2s ease;
}

.tableRow:hover {
  background-color: #f8f8f8;
}

td {
  padding: 16px 20px;
  text-align: center;
  font-weight: 500;
  vertical-align: middle;
}

.actionBtn {
  height: 36px;
  padding: 6px 12px;
  font-size: 18px;
  background-color: #487cff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.actionBtn:hover {
  background-color: #134fe7;
}

.actionBtn:active {
  background-color: #aac0ff;
}

.icon-btn {
  background: none;
  border: none;
  padding: 2px;
  margin: 0 4px;
  cursor: pointer;
}
</style>
