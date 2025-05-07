-- CreateTable
CREATE TABLE `SystemEvents` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `CustomerID` BIGINT NULL,
    `ReceivedAt` DATETIME(3) NULL,
    `DeviceReportedTime` DATETIME(3) NULL,
    `Facility` SMALLINT NULL,
    `Priority` SMALLINT NULL,
    `FromHost` VARCHAR(60) NULL,
    `Message` TEXT NULL,
    `NTSeverity` INTEGER NULL,
    `Importance` INTEGER NULL,
    `EventSource` VARCHAR(60) NULL,
    `EventUser` VARCHAR(60) NULL,
    `EventCategory` INTEGER NULL,
    `EventID` INTEGER NULL,
    `EventBinaryData` TEXT NULL,
    `MaxAvailable` INTEGER NULL,
    `CurrUsage` INTEGER NULL,
    `MinUsage` INTEGER NULL,
    `MaxUsage` INTEGER NULL,
    `InfoUnitID` INTEGER NULL,
    `SysLogTag` VARCHAR(60) NULL,
    `EventLogType` VARCHAR(60) NULL,
    `GenericFileName` VARCHAR(60) NULL,
    `SystemID` INTEGER NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SystemEventsProperties` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `SystemEventID` INTEGER NULL,
    `ParamName` VARCHAR(255) NULL,
    `ParamValue` TEXT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SystemEventsProperties` ADD CONSTRAINT `SystemEventsProperties_SystemEventID_fkey` FOREIGN KEY (`SystemEventID`) REFERENCES `SystemEvents`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
